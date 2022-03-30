import { IRequest } from 'src/interfaces/request.interface'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: IRequest = ctx.switchToHttp().getRequest()
    const user = request.user

    return data ? user?.[data] : user
  }
)
