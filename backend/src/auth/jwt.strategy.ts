import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from 'src/_supabase/supabase.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
        private configService: ConfigService,
        private supabaseService: SupabaseService,
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get('SUPABASE_JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    try {
        // You can add additional validation here
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role,
        };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}