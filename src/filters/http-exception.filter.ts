import { IRequest } from 'src/interfaces/request.interface'
import { IResponse } from 'src/interfaces/response.interface'
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<IResponse>()
    const request = ctx.getRequest<IRequest>()
    const status = exception.getStatus()
    const { errors } = exception.getResponse() as any

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.url,
      message: exception.message,
      errors,
    })
  }
}

export const httpExceptionFilter = new HttpExceptionFilter()
