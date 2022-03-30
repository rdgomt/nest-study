import { ValidationError } from 'class-validator'
import { HttpException, HttpStatus } from '@nestjs/common'

export class InvalidDataException extends HttpException {
  constructor(errors: ValidationError[]) {
    super({ errors }, HttpStatus.BAD_REQUEST)
  }
}
