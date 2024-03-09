import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * Guard that checks the required roles.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

 // This method checks if the user has the required roles to access the route.
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = requiredRoles ? requiredRoles.some((role) => user.roles?.includes(role)) : true;
    const isAdmin = user.roles.includes('admin');
    const userIdFromParam = context.switchToHttp().getRequest().params.id;

    // If the user is an admin or the user ID from the request parameter matches the user ID in the token, the user has the required roles.
    if (isAdmin || user.userId === userIdFromParam) {
      return hasRole;
    }

    return false;
  }
}
