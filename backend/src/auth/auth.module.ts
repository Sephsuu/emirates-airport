import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/entities/users/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import * as dotenv from 'dotenv';
import { SupabaseService } from "src/_supabase/supabase.service";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

dotenv.config();

@Module({
    
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET!,
            signOptions: { expiresIn: '1h' }
        }),
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [
        AuthService,
        SupabaseService,
        JwtStrategy,
        JwtAuthGuard,
    ],
    controllers: [AuthController],
    exports: [AuthService, SupabaseService, JwtAuthGuard],
})

export class AuthModule {}