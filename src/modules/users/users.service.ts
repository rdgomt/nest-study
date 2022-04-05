import {
  AppMetadata,
  AuthenticationClient,
  CreateUserData,
  ManagementClient,
  User,
  UserMetadata,
  TokenResponse,
  PasswordGrantOptions,
} from 'auth0'
import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { EnvService } from '../env/env.service'

@Injectable()
export class UsersService {
  constructor(private env: EnvService) {}

  private audience = this.env.get('AUTH_AUTH0_AUDIENCE')

  private credentials = {
    domain: this.env.get('AUTH_AUTH0_DOMAIN'),
    clientId: this.env.get('AUTH_AUTH0_CLIENT_ID'),
    clientSecret: this.env.get('AUTH_AUTH0_CLIENT_SECRET'),
  }

  private authenticationClient = new AuthenticationClient(this.credentials)

  private managementClient = new ManagementClient(this.credentials)

  async login(data: PasswordGrantOptions): Promise<TokenResponse> {
    try {
      return await this.authenticationClient.passwordGrant({
        audience: this.audience,
        scope: 'openid',
        ...data,
      })
    } catch (error) {
      switch (error.name) {
        case 'ArgumentError':
          throw new BadRequestException(error.message)
        case 'invalid_grant':
          throw new UnauthorizedException("Wrong user's credentials.")
        case 'unauthorized_client':
          throw new UnauthorizedException(error.message)
        default:
          throw new HttpException(error, 500)
      }
    }
  }

  async getUsers(): Promise<User<AppMetadata, UserMetadata>[]> {
    try {
      return await this.managementClient.getUsers()
    } catch (error) {
      throw new HttpException(error, error.statusCode)
    }
  }

  async createUser(
    data: CreateUserData
  ): Promise<User<AppMetadata, UserMetadata>> {
    try {
      return await this.managementClient.createUser(data)
    } catch (error) {
      throw new HttpException(error, error.statusCode)
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const user = await this.managementClient.getUser({ id })

      return await this.managementClient.deleteUser({ id: user.user_id })
    } catch (error) {
      throw new HttpException(error, error.statusCode)
    }
  }
}
