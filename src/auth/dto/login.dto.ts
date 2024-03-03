import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    /**
     * Username of the user     
     */
    @ApiProperty({ example: 'usertest' })
    username: string;

    /**
     * Password of the user     
     */
    @ApiProperty({ example: 'password123' })
    password: string;
}
