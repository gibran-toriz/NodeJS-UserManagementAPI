import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import { LoggingInterceptor } from '../../common/interceptors/response-logging.interceptor';

/**
 * Controller for managing user operations.
 */
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * Create a new user.
     * @param createUserDto - The data for creating a new user.
     * @returns The created user.
     */
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    /**
     * Get all users.
     * @returns An array of users.
     */
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
    
    /**
     * Get a user by ID.
     * @param id - The ID of the user to retrieve.
     * @returns The user with the specified ID.
     */
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    /**
     * Update a user by ID.
     * @param id - The ID of the user to update.
     * @param updateUserDto - The data for updating the user.
     * @returns The updated user.
     */
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }

    /**
     * Delete a user by ID.
     * @param id - The ID of the user to delete.
     * @returns The deleted user.
     */
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(id);
    }
}