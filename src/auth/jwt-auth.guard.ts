import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard class extends the AuthGuard class and is used to guard routes with JWT authentication.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
