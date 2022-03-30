import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsAlphanumeric()
  username: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}
