export interface IDatabaseConfig {
  DATABASE_TYPE: string
  DATABASE_HOST: string
  DATABASE_PORT: number
  DATABASE_NAME: string
  DATABASE_USER: string
  DATABASE_PASS: string
}

export function databaseConfig(): IDatabaseConfig {
  return {
    DATABASE_TYPE: process.env.DATABASE_TYPE,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASS: process.env.DATABASE_PASS,
  }
}
