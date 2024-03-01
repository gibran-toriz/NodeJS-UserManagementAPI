import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * Data transfer object for creating a user.
 */
export class CreateUserDto {
    /**
     * The username of the user.
     */
    @IsNotEmpty()
    readonly username: string;

    /**
     * The email of the user.
     */
    @IsEmail()
    readonly email: string;

    /**
     * The password of the user.
     * Minimum length: 8 characters.
     */
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;

    /**
     * The first name of the user.
     */
    @IsNotEmpty()
    readonly firstName: string;

    /**
     * The last name of the user (optional).
     */
    readonly lastName?: string;
}
