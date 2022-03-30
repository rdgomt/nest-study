import { Public } from 'src/decorators/public.decorator'
import { IRequest } from 'src/interfaces/request.interface'
import { Controller, Request, Post, UseGuards, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Request() req: IRequest) {
    const { id, email, roles } = req.user
    return this.authService.login({ id, email, roles })
  }
}
