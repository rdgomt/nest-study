export interface IAuthConfig {
  AUTH_SECRET: string
}

export function authConfig(): IAuthConfig {
  return {
    AUTH_SECRET: process.env.AUTH_SECRET,
  }
}
