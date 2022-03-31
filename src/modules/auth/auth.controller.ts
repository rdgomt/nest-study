import { Public } from 'src/decorators/public.decorator'
import { Controller, Post, HttpCode, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(200)
  login(@Body() data: LoginDto) {
    return this.authService.login(data)
  }
}
