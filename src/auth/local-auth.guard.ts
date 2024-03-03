import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * A guard that implements local authentication strategy.
 * Extends the AuthGuard class and uses the 'local' strategy.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}