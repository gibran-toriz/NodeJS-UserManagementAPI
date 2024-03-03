import * as bcrypt from 'bcrypt';
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
     * @param email - The user's email.
     * @param password - The user's password.
     * @returns The user if the credentials are valid; null otherwise.
     */
    async validateCredentials(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmailWithPassword(email);
        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            const { password, ...result } = user.toObject();
            return result;
          }
        }
        return null;
    }

    /**
     * Generates an access token for the user.
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