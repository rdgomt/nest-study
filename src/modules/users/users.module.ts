import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  imports: [EnvModule],
  providers: [UsersService],
})
export class UsersModule {}
