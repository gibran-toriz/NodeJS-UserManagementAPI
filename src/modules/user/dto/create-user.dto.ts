import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * Data transfer object for creating a user.
 */
export class CreateUserDto {    
    
    /**
     * The email of the user.
     */
    @ApiProperty({ example: 'user.tes@example.com' })
    @IsEmail()
    readonly email: string;

    /**
     * The password of the user.
     * Minimum length: 8 characters.
     */
    @ApiProperty({ example: 'strongPassword123', minLength: 8 })
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;

    /**
     * The first name of the user.
     */
    @ApiProperty({ example: 'User' })
    @IsNotEmpty()
    readonly firstName: string;

    /**
     * The last name of the user (optional).
     */
    @ApiProperty({ example: 'Test' })
    readonly lastName?: string;
}

