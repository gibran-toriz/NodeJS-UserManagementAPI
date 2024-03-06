import * as bcrypt from 'bcrypt';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { logger } from '../config/logger';

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
        if (!user) {
            logger.error(`Invalid credentials for user with email: ${email}`);  
            throw new UnauthorizedException('Invalid credentials');
        }        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.error(`Invalid credentials for user with email: ${email}`);  
            throw new UnauthorizedException('Invalid credentials');
        }
        const { password: _, ...result } = user.toObject();      
        return result;
    }

    /**
     * Generates an access token for the user.
     * @param user - The user object.
     * @returns An object containing the access token.     
     */
    async login(user: any) {     
        const payload = { 
            iss: 'example.company.com',
            roles: user.roles || ['user'],
            email: user.email,            
        };
        
        try {
            const accessToken = this.jwtService.sign(payload);
            logger.info(`User ${user.email} logged in successfully`);
            return {                
                accessToken,
            };    
        } catch (error) {
            logger.error(`Failed to generate access token: ${error.message}`);
            throw new InternalServerErrorException('Failed to generate access token');
        }                    
    }
}