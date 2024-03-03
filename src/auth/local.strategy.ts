import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
    * Validates the username and password of a user.
    * @param loginDto - The login data transfer object containing username and password.
    * @returns A Promise that resolves to the validated user.
    * @throws UnauthorizedException if the user is not valid.
  */
  async validate(loginDto: LoginDto): Promise<any> {    
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
