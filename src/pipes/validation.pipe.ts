import { ValidationError } from 'class-validator'
import { InvalidDataException } from 'src/exceptions/invalid-data.exception'
import { ValidationPipe } from '@nestjs/common'

const options = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => {
    return new InvalidDataException(errors)
  },
}

export const validationPipe = new ValidationPipe(options)
