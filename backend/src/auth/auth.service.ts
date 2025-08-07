import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/entities/users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { SupabaseService } from "src/_supabase/supabase.service";
import { ConfigService } from "@nestjs/config";

const table: string = '_user';

@Injectable() 
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private supabaseService: SupabaseService,
        private configService: ConfigService,
    ) {}

    async getOAuthUrl(provider: string) {
        const validProviders = ['google', 'github', 'discord', 'facebook', 'twitter'];
        
        if (!validProviders.includes(provider)) {
            throw new BadRequestException('Invalid OAuth provider');
        }

        const { data, error } = await this.supabaseService.client.auth.signInWithOAuth({
            provider: provider as any,
            options: {
                redirectTo: `${this.configService.get('APP_URL')}/auth/callback`,
            },
        });

        if (error) {
            throw new BadRequestException('Failed to generate OAuth URL');
        }

        return data.url;
    }

    // Updated method to handle session tokens instead of auth code
    async handleOAuthSession(tokenData: {
        access_token: string;
        refresh_token: string;
        expires_in: string;
        token_type: string;
    }) {
        try {
            console.log('handleOAuthSession - extracting user from token...');
            
            // Instead of setSession, get user info directly from the access token
            const { data: { user }, error } = await this.supabaseService.client.auth.getUser(tokenData.access_token);

            if (error) {
                console.error('Failed to get user from token:', error);
                throw new UnauthorizedException(`Invalid access token: ${error.message}`);
            }

            if (!user) {
                throw new UnauthorizedException('No user found for this token');
            }

            console.log('User extracted from token:', {
                id: user.id,
                email: user.email,
                provider: user.app_metadata?.provider
            });

            // Check if user exists in your database
            let dbUser = await this.userService.findUserByEmail(user.email!);
            
            if (!dbUser) {
                console.log('Creating new user...');
                dbUser = await this.userService.createWithGoole({
                    email: user.email!,
                    name: user.user_metadata?.full_name || user.email,
                    avatar: user.user_metadata?.avatar_url,
                    provider: user.app_metadata?.provider!,
                    provider_id: user.user_metadata?.provider_id || user.id,
                });
            }

            // Generate your JWT token
            const payload = {
                sub: dbUser.id,
                email: dbUser.email,
                name: dbUser.name,
            };

            const token = this.jwtService.sign(payload);

            return {
                token,
                user: dbUser,
                supabase_session: {
                    access_token: tokenData.access_token,
                    refresh_token: tokenData.refresh_token,
                    expires_in: tokenData.expires_in,
                },
            };
            
        } catch (error) {
            console.error('OAuth session error:', error);
            throw new UnauthorizedException(`OAuth session failed: ${error.message}`);
        }
    }


    async handleOAuthCallback(code: string, provider: string) {
        try {
        const { data, error } = await this.supabaseService.client.auth.exchangeCodeForSession(code);

        if (error) {
            throw new UnauthorizedException('OAuth callback failed');
        }

        return {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            expires_in: data.session.expires_in,
            user: data.user,
        };
        } catch (error) {
            throw new UnauthorizedException('Invalid OAuth code');
        }
    }

    async getProfile(userId: string) {
        const { data: user, error } = await this.supabaseService.client
        .from('profiles') // Assuming you have a profiles table
        .select('*')
        .eq('id', userId)
        .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            throw new BadRequestException('Failed to fetch user profile');
        }

        return user;
    }

    async refreshToken(refreshToken: string) {
        try {
        const { data, error } = await this.supabaseService.client.auth.refreshSession({
            refresh_token: refreshToken,
        });

        if (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        return {
            access_token: data.session!.access_token,
            refresh_token: data.session!.refresh_token,
            expires_in: data.session!.expires_in,
        };
        } catch (error) {
            throw new UnauthorizedException('Token refresh failed');
        }
    }

    async logout(userId: string) {
        const { error } = await this.supabaseService.client.auth.signOut();
        
        if (error) {
            throw new BadRequestException('Logout failed');
        }

        return { message: 'Logged out successfully' };
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid Credentials');

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new UnauthorizedException('Password do not matched');

        const { password: _, ...safeUser } = user;
        return safeUser;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);

        const payload = { sub: user.id, email: user.email };

        const accessToken = this.jwtService.sign(payload);

        return { accessToken, payload }
    }


}