import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/entities/users/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET!,
            signOptions: { expiresIn: '1h' }
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
})

export class AuthModule {}