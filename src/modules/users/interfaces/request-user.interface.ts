import { Role } from '@prisma/client'

export interface IRequestUser {
  id: string
  email: string
  roles: Role[]
  iat?: number
  exp?: number
}
