import { hash } from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { users } from './seeds/users'

const prisma = new PrismaClient()

async function main() {
  users.map(async (user) => {
    await prisma.user.create({
      data: { ...user, password: await hash(user.password, 10) },
    })
  })
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
