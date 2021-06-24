import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from 'src/shared/enums/role.enum';
import { ROLES_KEY } from './roles.decorator';

import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }

        const { user } = await context.switchToHttp().getRequest();

        console.log(user)

        const fn = ExtractJwt.fromAuthHeaderAsBearerToken()
        console.log(fn(context.switchToHttp().getRequest()))

        // console.log(context.switchToHttp().getRequest())
        console.log(requiredRoles)

        // return true;

        return requiredRoles === user.role;
    }
}