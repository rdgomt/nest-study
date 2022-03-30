import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesGuard } from '../../guards/roles.guard'
import { AuthModule } from '../auth/auth.module'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UsersModule } from '../users/users.module'
import { appConfig } from './app.config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { databaseConfig } from './database.config'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ load: [appConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ load: [databaseConfig] })],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          synchronize: true, // DISABLE IT IN PRODUCTION MODE!
          retryAttempts: 3,
          type: configService.get<any>('DATABASE_TYPE'),
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          database: configService.get<string>('DATABASE_NAME'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASS'),
          entities: [join(__dirname, '../../', '**', '*.entity.{ts,js}')],
        }
      },
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
