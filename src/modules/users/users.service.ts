import { hash, compare } from 'bcrypt'
import { Repository } from 'typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { IUser } from './interfaces/user.interface'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const password = await hash(user.password, 10)

    const createdUser = await this.usersRepository.save({ ...user, password })

    return createdUser
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async findByEmail(email: string): Promise<User | NotFoundException> {
    const user = await this.usersRepository.findOne(null, { where: { email } })

    if (user) return user

    throw new NotFoundException()
  }

  async findByEmailAndValidatePassword(
    email: string,
    password: string
  ): Promise<IUser | null> {
    const user = await this.usersRepository
      .createQueryBuilder()
      .where({ email })
      .addSelect('User.password')
      .getOne()

    if (user) {
      const isPasswordValid = await compare(password, user.password)

      if (user && isPasswordValid) {
        const { password, ...result } = user
        return result
      }
    }

    return null
  }
}
