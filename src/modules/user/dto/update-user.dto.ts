import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

/**
 * Data transfer object for updating a user.
 */
export class UpdateUserDto {  


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
    @MinLength(1)
    readonly firstName?: string;

    /**
     * The last name of the user. Optional.
     */
    @ApiProperty({ example: 'Test'})
    @IsOptional()
    @MinLength(1)
    readonly lastName?: string;
}
