import { SetMetadata } from '@nestjs/common';

/**
 * Decorator function that sets the metadata for the roles allowed to access a resource.
 * @param roles The roles allowed to access the resource.
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);