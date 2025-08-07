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