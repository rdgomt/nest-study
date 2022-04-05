import { AuthGuard } from 'src/guards/auth.guard'
import { PermissionsGuard } from 'src/guards/permissions.guard'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { PrismaModule } from '../database/prisma/prisma.module'
import { EnvModule } from '../env/env.module'
import { UsersModule } from '../users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  controllers: [AppController],
  imports: [EnvModule, PrismaModule, UsersModule],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
