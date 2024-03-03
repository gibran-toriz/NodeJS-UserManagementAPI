import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * A guard that checks if the user has the required roles to access a route.
 */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    /**
     * Determines if the user has the required roles to access the route.
     * @param context - The execution context of the route.
     * @returns A boolean indicating if the user has the required roles.
     */
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return roles.includes(user.role);
    }
}