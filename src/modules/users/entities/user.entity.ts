import { IsEmail, MinLength } from 'class-validator'
import { Role } from 'src/enums/role.enum'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column({ select: false })
  // @Exclude()
  password: string

  @Column()
  @MinLength(2)
  name: string

  @Column({ unique: true })
  username: string

  @Column('varchar', { array: true, default: [] })
  roles: Role[]
}
