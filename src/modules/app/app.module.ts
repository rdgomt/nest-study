import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from '../../guards/jwt-auth.guard'
import { RolesGuard } from '../../guards/roles.guard'
import { AuthModule } from '../auth/auth.module'
import { PrismaModule } from '../database/prisma/prisma.module'
import { UsersModule } from '../users/users.module'
import { appConfig } from './app.config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ load: [appConfig] }),
    PrismaModule,
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
