import { INextFunction } from 'src/interfaces/next-function.interface'
import { IRequest } from 'src/interfaces/request.interface'
import { IResponse } from 'src/interfaces/response.interface'

export function loggerMiddleware(
  req: IRequest,
  _res: IResponse,
  next: INextFunction
) {
  console.log(`${new Date()} ${req.method} ${req.url}`)

  next()
}
