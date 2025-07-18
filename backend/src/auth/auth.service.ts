import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/entities/users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

const table: string = '_user';

@Injectable() 
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

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