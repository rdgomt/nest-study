import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(data: LoginDto) {
    const user = await this.usersService.findUserByEmailAndValidatePassword(
      data.email,
      data.password
    )

    if (user) {
      return {
        access_token: this.jwtService.sign({
          id: user.id,
          email: user.email,
          roles: user.roles,
        }),
      }
    }

    throw new UnauthorizedException()
  }
}
