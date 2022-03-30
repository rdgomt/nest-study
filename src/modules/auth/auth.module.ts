import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '../users/users.module'
import { authConfig } from './auth.config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'

const configModule = ConfigModule.forRoot({ load: [authConfig] })

@Module({
  controllers: [AuthController],

  exports: [AuthService],

  providers: [AuthService, LocalStrategy, JwtStrategy],

  imports: [
    configModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [configModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('AUTH_SECRET'),
          signOptions: { expiresIn: '60d' },
        }
      },
    }),
  ],
})
export class AuthModule {}
