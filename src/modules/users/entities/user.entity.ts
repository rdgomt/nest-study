import { User, Role } from '@prisma/client'

export class UserEntity implements User {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  username: string
  email: string
  roles: Role[]
  password: string
}
