import { PERMISSIONS_KEY } from 'src/decorators/permissions.decorator'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const routePermissions = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler()
    )

    if (!routePermissions) {
      return true
    }
    const userPermissions: string[] = context.getArgs()[0].user.permissions

    const hasPermission = () =>
      routePermissions.every((routePermission) =>
        userPermissions.includes(routePermission)
      )

    return hasPermission()
  }
}
