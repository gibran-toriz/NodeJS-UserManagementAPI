import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
/**
 * Controller responsible for handling authentication-related requests.
 */
export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     * Handles POST requests to /auth/login. 
     * @param req The request object
     */
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}