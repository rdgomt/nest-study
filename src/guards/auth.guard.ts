import jwt from 'express-jwt'
import { expressJwtSecret } from 'jwks-rsa'
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator'
import { IRequest } from 'src/interfaces/request.interface'
import { IResponse } from 'src/interfaces/response.interface'
import { EnvService } from 'src/modules/env/env.service'
import { promisify } from 'util'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AuthGuard implements CanActivate {
  private AUTH_AUTH0_AUDIENCE: string
  private AUTH_AUTH0_ISSUER_URL: string

  constructor(private env: EnvService, private reflector: Reflector) {
    this.AUTH_AUTH0_AUDIENCE = this.env.get('AUTH_AUTH0_AUDIENCE')
    this.AUTH_AUTH0_ISSUER_URL = this.env.get('AUTH_AUTH0_ISSUER_URL')
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IRequest = context.switchToHttp().getRequest()

    const response: IResponse = context.switchToHttp().getResponse()

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    } else {
      const checkJWT = promisify(
        jwt({
          secret: expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `${this.AUTH_AUTH0_ISSUER_URL}.well-known/jwks.json`,
          }),
          audience: this.AUTH_AUTH0_AUDIENCE,
          issuer: this.AUTH_AUTH0_ISSUER_URL,
          algorithms: ['RS256'],
        })
      )

      try {
        await checkJWT(request, response)
        return true
      } catch (err) {
        throw new UnauthorizedException(err)
      }
    }
  }
}
