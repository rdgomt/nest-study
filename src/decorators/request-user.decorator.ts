import { IRequest } from 'src/interfaces/request.interface'
import { IRequestUser } from 'src/modules/users/request-user.interface'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const RequestUser = createParamDecorator(
  (data: keyof IRequestUser | undefined, ctx: ExecutionContext) => {
    const request: IRequest = ctx.switchToHttp().getRequest()
    const user = request.user

    return data ? user?.[data] : user
  }
)
