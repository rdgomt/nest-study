import { Role } from 'src/enums/role.enum'

export interface IUser {
  id: string
  email: string
  username: string
  name: string
  roles: Role[]
}
