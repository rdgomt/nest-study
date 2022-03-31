import helmet from 'helmet'
import { NestFactory } from '@nestjs/core'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { PrismaClientKnowRequestExceptionFilter } from './filters/prisma-client-know-request-exception.filter'
import { loggerMiddleware } from './middlewares/logger.middleware'
import { appConfig } from './modules/app/app.config'
import { AppModule } from './modules/app/app.module'
import { validationPipe } from './pipes/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.use(helmet())
  app.use(loggerMiddleware)
  app.useGlobalPipes(validationPipe)
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PrismaClientKnowRequestExceptionFilter()
  )

  await app.listen(appConfig().APP_PORT)
}

bootstrap()
