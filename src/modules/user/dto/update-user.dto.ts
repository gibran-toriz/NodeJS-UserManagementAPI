import { IsEmail, IsOptional, MinLength } from 'class-validator';

/**
 * Data transfer object for updating a user.
 */
export class UpdateUserDto {
    /**
     * The username of the user. Optional.
     */
    @IsOptional()
    readonly username?: string;

    /**
     * The email of the user. Optional.
     */
    @IsEmail()
    @IsOptional()
    readonly email?: string;

    /**
     * The password of the user. Optional. Must be at least 8 characters long.
     */
    @IsOptional()
    @MinLength(8)
    readonly password?: string;

    /**
     * The first name of the user. Optional.
     */
    @IsOptional()
    readonly firstName?: string;

    /**
     * The last name of the user. Optional.
     */
    @IsOptional()
    readonly lastName?: string;
}
