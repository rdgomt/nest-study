import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IEnvironmentVariables } from './env.config'

@Injectable()
export class EnvService extends ConfigService<IEnvironmentVariables> {}
