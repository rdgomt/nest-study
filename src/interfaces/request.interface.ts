import { Request } from 'express'
import { IRequestUser } from 'src/modules/users/request-user.interface'

export interface IRequest extends Request {
  user?: IRequestUser
}
