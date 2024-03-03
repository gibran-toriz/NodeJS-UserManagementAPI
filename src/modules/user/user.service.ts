import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

  /**
   * Create a new user.
   * @param createUserDto The user data transfer object containing the user details.
   * @returns The created user.
   */
    async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = await this.userModel.create(createUserDto);            
        return this.userModel.findById(newUser.id);        
    }

  /**
   * Retrieve all users.
   * @returns An array of users.
   */
    async findAll(): Promise<User[]> {
        return this.userModel.find();
    }

  /**
   * Retrieve a user by their ID.
   * @param id The ID of the user to retrieve.
   * @returns The requested user.
   */
    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return user;
    }

  /**
   * Update a user's details.
   * @param id The ID of the user to update.
   * @param updateUserDto The updated user details.
   * @returns The updated user.
   */
    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true });
        if (!updatedUser) {
        throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return updatedUser;
    }

  /**
   * Delete a user by their ID.
   * @param id The ID of the user to delete.
   * @returns The result of the deletion operation.
   */
    async delete(id: string): Promise<any> {
        const result = await this.userModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return result;    
    }

}
