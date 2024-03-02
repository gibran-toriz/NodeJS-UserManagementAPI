import { Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

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
     * @param username - The username of the user.
     * @param password - The password of the user.
     * @returns A Promise that resolves to the user object if the credentials are valid, otherwise null.
     */
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    /**
     * Logs in the user and generates an access token.
     * @param user - The user object.
     * @returns An object containing the access token.
     */
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}