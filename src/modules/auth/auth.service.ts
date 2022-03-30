import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { IRequestUser } from '../users/interfaces/request-user.interface'
import { IUser } from '../users/interfaces/user.interface'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<IUser | null> {
    return await this.usersService.findByEmailAndValidatePassword(
      email,
      password
    )
  }

  async login(user: IRequestUser) {
    return {
      access_token: this.jwtService.sign(user),
    }
  }
}
