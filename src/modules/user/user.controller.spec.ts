import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';

/**
 * Unit tests for the UserController.
 */
describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  /**
  * Test case: should be defined
  * It verifies that the UserController is defined.
  */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

    /**
     * Test case: should create a user
     * It verifies that the create method of the UserController creates a user.
    */     
    it('should create a user', async () => {
        const dto: CreateUserDto = {         
            email: 'test@example.com',            
            password: 'password123',
            firstName: 'Test',
        };
        const user = { id: '1', ...dto }; 
        (service.create as jest.Mock).mockResolvedValue(user);        

        expect(await controller.create(dto)).toEqual(user);
        expect(service.create).toHaveBeenCalledWith(dto);
    });



  /**   
   * Test case: should find all users
   * It verifies that the findAll method of the UserController finds all users.
   */
  it('should find all users', async () => {
    const users = [{ id: '1', email: 'test@example.com' }];
    (service.findAll as jest.Mock).mockResolvedValue(users);            

    expect(await controller.findAll()).toEqual(users);
    expect(service.findAll).toHaveBeenCalled();
  });

  /**
   * Test case: should find one user
   * It verifies that the findOne method of the UserController finds one user by ID.
   * */
  it('should find one user', async () => {
    const user = { id: '1', email: 'test@example.com' };
    (service.findOne as jest.Mock).mockResolvedValue(user); 

    expect(await controller.findOne('1')).toEqual(user);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });
});