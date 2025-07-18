import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "src/entities/users/user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() user: CreateUserDTO) {
        return this.authService.login(user.email, user.password);
    }
}