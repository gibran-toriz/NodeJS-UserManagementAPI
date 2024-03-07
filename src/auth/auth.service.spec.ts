import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Unit tests for the AuthService.
 */
describe('AuthService', () => {
    let authService: AuthService;
    let userService: Partial<Record<keyof UserService, jest.Mock>>;
    let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

    /**
     * Before each test, create a new module with the AuthService and mock UserService and JwtService.
     */
    beforeEach(async () => {
        userService = {
            findByEmailWithPassword: jest.fn().mockImplementation((email: string) => ({
                id: 'someUserId',
                email,
                password: bcrypt.hashSync('password', 10),
            })),           
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UserService, useValue: userService },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('mockAccessToken'), // Mock implementation
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService) as any;
    });

    describe('validateCredentials', () => {

     /**
     * Test case: should be defined
     * It verifies that the AuthService is defined.
     */
        it('should be defined', () => {
            expect(authService).toBeDefined();
        });

        /**
         * Test case: validateCredentials should return user data if credentials are valid
         * It verifies that the validateCredentials method returns user data if the credentials are valid.
         */
        it('validateCredentials should return user data if credentials are valid', async () => {
            const userEmail = 'test@example.com';
            const userPassword = 'password';
            
            userService.findByEmailWithPassword.mockResolvedValue({
                email: userEmail,
                password: await bcrypt.hash(userPassword, 10), 
                toObject: function() { 
                    return { email: this.email };
                }
            });

            const user = await authService.validateCredentials(userEmail, userPassword);

            expect(user).toBeDefined();
            expect(user.email).toEqual(userEmail);            
        });


        /**
         * Test case: validateCredentials should throw UnauthorizedException if user credentials are invalid
         * It verifies that the validateCredentials method throws an UnauthorizedException if the user credentials are invalid.
         */
        it('should throw UnauthorizedException if user credentials are invalid', async () => {
            const email = 'testemail';
            const password = 'testpassword';

            userService.findByEmailWithPassword.mockResolvedValue(null);

            await expect(authService.validateCredentials(email, password)).rejects.toThrow(UnauthorizedException);
            expect(userService.findByEmailWithPassword).toHaveBeenCalledWith(email);
        });        
    });

    describe('login', () => {

        /**
         * Test case: should generate an access token for the user
         * It verifies that the login method generates an access token for the user.
         */
        it('should generate an access token for the user', async () => {
            const user = { email: 'test@example.com', sub: 'userId', _id: 'userId', roles: ['user']}; 
            const accessToken = await authService.login(user);
    
            expect(accessToken).toEqual({ accessToken: 'mockAccessToken' }); 
            expect(jwtService.sign).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@example.com' })); 
        });

        /**
         * Test case: should throw InternalServerErrorException if failed to generate access token
         * It verifies that the login method throws an InternalServerErrorException if it fails to generate an access token.
         */
        it('should throw InternalServerErrorException if failed to generate access token', async () => {
            const user = {
                email: 'testemail',
                roles: ['user'],                
                _id: 'userId',
            };

            jwtService.sign.mockImplementation(() => {
                throw new Error('Failed to generate access token');
            });

            await expect(authService.login(user)).rejects.toThrow(InternalServerErrorException);
            expect(jwtService.sign).toHaveBeenCalled();
        });
    });
});