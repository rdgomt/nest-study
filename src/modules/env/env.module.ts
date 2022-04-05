import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envConfig, validateEnvConfig } from './env.config'
import { EnvService } from './env.service'

@Module({
  exports: [EnvService],
  providers: [EnvService],
})
export class EnvModule extends ConfigModule {}

EnvModule.forRoot({
  isGlobal: true,
  expandVariables: true,
  load: [envConfig],
  validate: validateEnvConfig,
  envFilePath: `.env.${process.env.NODE_ENV}`,
})
