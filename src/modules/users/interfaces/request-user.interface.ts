import { Role } from 'src/enums/role.enum'

export interface IRequestUser {
  id: string
  email: string
  roles: Role[]
}
