import { Controller, Request, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

/**
 * Controller responsible for handling authentication-related requests.
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     * Handles POST requests to /auth/login. 
     * @param req The request object
     */
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: LoginDto })
    async login(@Req() req: Request & { user: any }) {
        return this.authService.login(req.user);
    }
}