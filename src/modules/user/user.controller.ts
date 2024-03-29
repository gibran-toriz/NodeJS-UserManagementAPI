import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

/**
 * Controller for managing user operations.
 */
@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * Create a new user.
     * @param createUserDto - The data for creating a new user.
     * @returns The created user.
     */
    @Post('register')
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    /**
     * Get all users.
     * @returns An array of users.
     */
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth('access-token')
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
    
    /**
     * Get a user by ID.
     * @param id - The ID of the user to retrieve.
     * @returns The user with the specified ID.
     */
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'user') 
    @ApiBearerAuth('access-token')
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
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'user') 
    @ApiBearerAuth('access-token')
    @Put(':id')    
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }

    /**
     * Delete a user by ID.
     * @param id - The ID of the user to delete.
     * @returns The deleted user.
     */
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'user') 
    @ApiBearerAuth('access-token')
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(id);
    }
}
