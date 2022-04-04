import { Roles } from 'src/decorators/roles.decorator'
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { Role } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data)
  }

  @Get()
  // @Roles(Role.admin)
  findAll() {
    return this.usersService.findAllUsers()
  }

  @Get(':id')
  // @Roles(Role.admin)
  findUnique(@Param('id') id: string) {
    return this.usersService.findUserById(id)
  }

  @Delete(':id')
  @Roles(Role.admin)
  delete(@Param('id') id: string) {
    return this.usersService.deleteUser(id)
  }
}
