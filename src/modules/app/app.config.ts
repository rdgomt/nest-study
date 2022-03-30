export interface IAppConfig {
  APP_PORT: number
}

export function appConfig(): IAppConfig {
  return {
    APP_PORT: parseInt(process.env.APP_PORT, 10) || 3000,
  }
}
