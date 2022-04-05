import { PrismaClient } from '@prisma/client'
import { posts } from './seeds/posts'

const prisma = new PrismaClient()

async function main() {
  posts.map(async (post) => {
    await prisma.post.create({
      data: post,
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
