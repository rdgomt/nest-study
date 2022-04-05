import { CreateUserData, PasswordGrantOptions } from 'auth0'
import { Permissions } from 'src/decorators/permissions.decorator'
import { Public } from 'src/decorators/public.decorator'
import { Permission } from 'src/enums/permission.enum'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @Public()
  @HttpCode(200)
  login(@Body() data: PasswordGrantOptions) {
    return this.usersService.login(data)
  }

  @Get()
  @Permissions(Permission.ReadUsers)
  getUsers() {
    return this.usersService.getUsers()
  }

  @Post()
  @Permissions(Permission.CreateUsers)
  createUser(@Body() data: CreateUserData) {
    return this.usersService.createUser(data)
  }

  @Delete(':id')
  @Permissions(Permission.DeleteUsers)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id)
  }
}
