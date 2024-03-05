import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';

/**
 * Unit tests for the UserService.
 */
describe('UserService', () => {
    let service: UserService;
    let userModel: Partial<Record<keyof Model<User>, jest.Mock>>;

    beforeEach(async () => {
        const mockUser = {
            _id: 'a unique id',            
            password: 'testpassword',
            email: 'testemail',
            firstName: 'testfirstName',            
        };

        userModel = {
            create: jest.fn().mockResolvedValue(mockUser),
            findById: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn().mockResolvedValue([mockUser]),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: getModelToken('User'), useValue: userModel },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    /**
     * Test case: should be defined
     * It verifies that the UserService is defined.
     */
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    /**
     * Test case: should create a user
     * It verifies that the create method of the UserService creates a user.
     */
    it('should create a user', async () => {
        const createUserDto: CreateUserDto = { email: 'testemail', password: 'testpassword', firstName: 'testfirstName' };
        const createdUser = await service.create(createUserDto);
        expect(userModel.create).toHaveBeenCalled();
        expect(userModel.findById).toHaveBeenCalled();   
        expect(createdUser.password).not.toBe('password');        
    });

    /**
     * Test case: should find all users
     * It verifies that the findAll method of the UserService finds all users.
     */
    it('should find all users', async () => {
        await service.findAll();
        expect(userModel.find).toHaveBeenCalled();
    });

    /**
     * Test case: should find one user
     * It verifies that the findOne method of the UserService finds one user by ID.
     */
    it('should find one user', async () => {
        const id = 'testid';
        await service.findOne(id);
        expect(userModel.findById).toHaveBeenCalledWith(id);
    });

    /**
     * Test case: should throw an error if user not found
     * It verifies that the findOne method of the UserService throws a NotFoundException if the user is not found.
     */
    it('should throw an error if user not found', async () => {
        userModel.findById = jest.fn().mockResolvedValue(null);
        await expect(service.findOne('testid')).rejects.toThrow(NotFoundException);
    });

    /**
     * Test case: should delete a user
     * It verifies that the delete method of the UserService deletes a user.
     */
    it('should delete a user', async () => {
        const id = 'testid';
        const mockDeletedUser = {
            _id: id,            
            email: 'testemail',
            password: 'testpassword',            
            firstName: 'testfirstName',
        };
        userModel.findByIdAndDelete = jest.fn().mockResolvedValue(mockDeletedUser);

        const result = await service.delete(id);

        expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(id);
        expect(result).toEqual(mockDeletedUser);
    });

    /**
     * Test case: should update a user
     * It verifies that the update method of the UserService updates a user.
     */
    it('should update a user', async () => {
        const id = 'testid';
        const updateUserDto: UpdateUserDto = { email: 'updatedemail', password: 'updatedpassword', firstName: 'updatedfirstName' };
        const mockUpdatedUser = {
            _id: id,            
            email: updateUserDto.email,
            password: updateUserDto.password,            
            firstName: updateUserDto.firstName,
        };
        userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedUser);

        const result = await service.update(id, updateUserDto);

        expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateUserDto, { new: true });
        expect(result).toEqual(mockUpdatedUser);
    });

    /**
     * Test case: should throw an error if user not found during update
     * It verifies that the update method of the UserService throws a NotFoundException if the user is not found.
     */
    it('should throw an error if user not found during update', async () => {
        const id = 'testid';
        const updateUserDto: UpdateUserDto = { email: 'updatedemail', password: 'updatedpassword', firstName: 'updatedfirstName' };
        userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

        await expect(service.update(id, updateUserDto)).rejects.toThrow(NotFoundException);
    });

});
