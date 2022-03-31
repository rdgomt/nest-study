import { ValidationError } from 'class-validator'
import { InvalidDataException } from 'src/exceptions/invalid-data.exception'
import { ValidationPipe } from '@nestjs/common'

const options = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => {
    throw new InvalidDataException(errors)
  },
}

export const validationPipe = new ValidationPipe(options)
