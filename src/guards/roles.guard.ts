import { ROLES_KEY } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/role.enum'
import { IRequestUser } from 'src/modules/users/interfaces/request-user.interface'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const user: IRequestUser = context.switchToHttp().getRequest().user

    return requiredRoles.some((role) => user.roles?.includes(role))
  }
}
