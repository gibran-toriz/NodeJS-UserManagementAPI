import { Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

/**
 * Service responsible for authentication-related operations.
 */
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    /**
     * Validates the user's credentials.
     * @param loginDto - The login data transfer object containing username and password.
     * @returns A Promise that resolves to the user object if the credentials are valid, otherwise null.
     */
    async validateUser(loginDto: LoginDto): Promise<any> {
        const { username, password } = loginDto;
        const user = await this.userService.findOne(username);
        if (user && user.password === password) { 
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    /**
     * Logs in the user and generates an access token.
     * @param loginDto - The login data transfer object containing username and password.
     * @returns An object containing the access token.
     */
    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto);
        if (!user) {
            throw new Error('Invalid credentials'); // Handle invalid credentials appropriately
        }
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}