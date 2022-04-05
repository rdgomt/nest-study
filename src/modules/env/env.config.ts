import { plainToClass } from 'class-transformer'
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator'

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export interface IEnvironmentVariables {
  NODE_ENV: Environment
  APP_PORT: number
  AUTH_AUTH0_AUDIENCE: string
  AUTH_AUTH0_DOMAIN: string
  AUTH_AUTH0_ISSUER_URL: string
  AUTH_AUTH0_CLIENT_ID: string
  AUTH_AUTH0_CLIENT_SECRET: string
  DATABASE_URL: string
}

class EnvironmentVariables implements IEnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsNumber()
  APP_PORT: number

  @IsString()
  AUTH_AUTH0_AUDIENCE: string

  @IsString()
  AUTH_AUTH0_DOMAIN: string

  @IsString()
  AUTH_AUTH0_ISSUER_URL: string

  @IsString()
  AUTH_AUTH0_CLIENT_ID: string

  @IsString()
  AUTH_AUTH0_CLIENT_SECRET: string

  @IsString()
  DATABASE_URL: string
}

export function envConfig(): IEnvironmentVariables {
  return {
    NODE_ENV: process.env.NODE_ENV as Environment,
    APP_PORT: parseInt(process.env.APP_PORT, 10) || 3000,
    AUTH_AUTH0_AUDIENCE: process.env.AUTH_AUTH0_AUDIENCE,
    AUTH_AUTH0_DOMAIN: process.env.AUTH_AUTH0_DOMAIN,
    AUTH_AUTH0_ISSUER_URL: process.env.AUTH_AUTH0_ISSUER_URL,
    AUTH_AUTH0_CLIENT_ID: process.env.AUTH_AUTH0_CLIENT_ID,
    AUTH_AUTH0_CLIENT_SECRET: process.env.AUTH_AUTH0_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  }
}

export function validateEnvConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })

  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return validatedConfig
}
