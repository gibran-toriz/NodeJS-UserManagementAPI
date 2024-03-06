import { Injectable, NotFoundException, BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import { logger } from '../../config/logger';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

  /**
   * Create a new user.
   * @param createUserDto The user data transfer object containing the user details.
   * @returns The created user.
   */
    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const newUser = await this.userModel.create(createUserDto);            
            logger.info(`New user registered: ${newUser.email}`);
            return this.userModel.findById(newUser.id);
        } catch (error) {
            if (error.name === 'ValidationError') {
                logger.error(`Failed to create user: ${error.message}`);
                throw new BadRequestException(error.message);
            } else if (error.code === 11000) {
                logger.error(`User ${createUserDto.email} already exists.`);
                throw new ConflictException('Duplicate key error');
            } else {
                logger.error(`Failed to create user: ${error.message}`);
                throw new InternalServerErrorException();
            } 
        }        
    }

  /**
   * Retrieve all users.
   * @returns An array of users.
   */
    async findAll(): Promise<User[]> {
        try {
            return this.userModel.find();
        } catch (error) {            
            logger.error(`Failed to retrieve users: ${error.message}`);            
            throw new InternalServerErrorException('Failed to retrieve users');
        }
    }

  /**
   * Retrieve a user by their ID.
   * @param id The ID of the user to retrieve.
   * @returns The requested user.
   */
    async findOne(id: string): Promise<User> {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                throw new NotFoundException(`User with ID "${id}" not found`);
            }
            return user;
        } catch (error) {            
            logger.error(`Failed to retrieve user: ${error.message}`);            
            throw new InternalServerErrorException('Failed to retrieve users');
        }        
    }

    /**
     * Retrieve a user by their email and retrive the password.
     * @param email The email of the user to retrieve.
     * @returns The requested user.
     */
    async findByEmailWithPassword(email: string): Promise<User> {
        try {
            return this.userModel.findOne({email}).select('+password');           
        } catch (error) {     
            logger.error(`Failed to retrieve users: ${error.message}`);            
            throw new InternalServerErrorException('Failed to retrieve user');
        }           
    }

  /**
   * Update a user's details.
   * @param id The ID of the user to update.
   * @param updateUserDto The updated user details.
   * @returns The updated user.
   */
    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const updatedUser = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true });
            if (!updatedUser) {
                logger.error(`User with ID "${id}" not found`);            
                throw new NotFoundException(`User with ID "${id}" not found`);
            }
            logger.info(`User with ID "${id}" updated successfully`);
            return updatedUser;
        } catch (error) {            
            if (error.name === 'ValidationError') {                
                logger.error(`Failed to update user": ${error.message}`); 
                throw new BadRequestException(error.message);
            } else {
                logger.error(`Failed to update user with ID "${id}": ${error.message}`);
                throw new InternalServerErrorException('Failed to update user');
            }
        }
    }

  /**
   * Delete a user by their ID.
   * @param id The ID of the user to delete.
   * @returns The result of the deletion operation.
   */
    async delete(id: string): Promise<any> {
        try {
            const result = await this.userModel.findByIdAndDelete(id);
            if (!result) {
                logger.error(`User with ID "${id}" not found`);
                throw new NotFoundException(`User with ID "${id}" not found`);
            }
            logger.info(`User with ID "${id}" deleted successfully`);
            return result;    
        } catch (error) {
            logger.error(`Failed to delete user with ID "${id}": ${error.message}`, error.stack);
            throw new InternalServerErrorException('Failed to delete user');
        }
        
    }

}
