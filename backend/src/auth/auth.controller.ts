import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "src/entities/users/user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Response } from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('oauth/:provider')
    async oauthLogin(
        @Param('provider') provider: string,
        @Res() res: Response
    ) {
        const redirectUrl = await this.authService.getOAuthUrl(provider);
        return res.redirect(redirectUrl);
    }

    // Handle OAuth callback
    @Get('callback')
    async oauthCallback(
        @Query('code') code: string,
        @Query('provider') provider: string,
        @Res() res: Response
    ) {
        await this.authService.handleOAuthCallback(code, provider);
        return res.redirect('http://localhost:3000/dashboard');
    }

    // Get current user (protected route)
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Req() req) {
        return this.authService.getProfile(req.user.userId);
    }

    // Refresh token
    @Post('refresh')
    async refreshToken(@Body() body: { refresh_token: string }) {
        return this.authService.refreshToken(body.refresh_token);
    }

    // Logout
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Req() req) {
        return this.authService.logout(req.user.userId);
    }

    @Post('login')
    async login(@Body() user: CreateUserDTO) {
        return this.authService.login(user.email, user.password);
    }
}