import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

/**
 * Data transfer object for updating a user.
 */
export class UpdateUserDto {  

    /**
     * The email of the user. Optional.
     */
    @ApiProperty({ example: 'user.tes@example.com' })
    @IsEmail()
    @IsOptional()
    readonly email?: string;

    /**
     * The password of the user. Optional. Must be at least 8 characters long.
     */
    @ApiProperty({ example: 'strongPassword123', minLength: 8 })
    @IsOptional()
    @MinLength(8)
    readonly password?: string;

    /**
     * The first name of the user. Optional.
     */
    @ApiProperty({ example: 'User' })
    @IsOptional()
    readonly firstName?: string;

    /**
     * The last name of the user. Optional.
     */
    @ApiProperty({ example: 'Test'})
    @IsOptional()
    readonly lastName?: string;
}
