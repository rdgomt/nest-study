import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { IRequestUser } from '../users/interfaces/request-user.interface'

@Injectable()
@Module({})
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('AUTH_SECRET'),
    })
  }

  async validate(payload: IRequestUser) {
    return payload
  }
}
