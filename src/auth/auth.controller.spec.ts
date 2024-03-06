import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

/**
 * Unit tests for the AuthController.
 */
describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<Record<keyof AuthService, jest.Mock>>;

  /**
     * Before each test, create a new module with the AuthController and mock AuthService.
     */
  beforeEach(async () => {
    mockAuthService = {
      login: jest.fn().mockImplementation((user) => ({
        access_token: 'mockToken',
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  /**
     * Test case: should be defined
     * It verifies that the AuthController is defined.
    */
  it('should return access token when login is successful', async () => {
    const req = { user: { email: 'test@example.com' } };
    const result = await controller.login(req as any);

    expect(result).toEqual({ access_token: 'mockToken' });
    expect(mockAuthService.login).toHaveBeenCalledWith(req.user);
  });

});
