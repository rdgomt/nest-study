import { IRequest } from 'src/interfaces/request.interface'
import { IResponse } from 'src/interfaces/response.interface'
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Prisma } from '@prisma/client'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientKnowRequestExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<IResponse>()
    const request = ctx.getRequest<IRequest>()
    const method = request.method
    const path = request.path
    const timestamp = new Date().toISOString()
    const meta = exception.meta as any
    const internalCode = exception.code
    let message = exception.message.replace(/\n/g, '') || 'Internal server error'
    let statusCode = 500

    switch (exception.code) {
      case 'P2002': {
        statusCode = HttpStatus.CONFLICT
        message = `${meta.target[0]} already exists`
        break
      }

      case 'P2025': {
        statusCode = HttpStatus.NOT_FOUND
        message = `record not found`
        break
      }

      // TODO catch other error codes
    }

    response.status(statusCode).json({
      statusCode,
      internalCode,
      timestamp,
      method,
      path,
      message,
      meta,
    })
  }
}
