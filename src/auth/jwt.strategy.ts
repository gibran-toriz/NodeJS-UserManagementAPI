import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

/**
    * Validates the JWT payload.
    * @param payload - The payload extracted from the JWT.
    * @returns An object containing the user ID and username.
    */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

/**
 * Validates the payload of a JWT token.
 * @param payload - The payload of the JWT token.
 * @returns An object containing the userId and username extracted from the payload.
 */
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, roles: payload.roles};
  }
}
