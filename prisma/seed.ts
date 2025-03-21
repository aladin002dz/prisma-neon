import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Delete all existing data
  await prisma.post.deleteMany({})
  await prisma.user.deleteMany({})
  
  // Create users
  const alice = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
    },
  })
  
  const bob = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
    },
  })
  
  console.log('Created users:', { alice, bob })
  
  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Hello World',
      content: 'This is my first post!',
      published: true,
      authorId: alice.id,
    },
  })
  
  const post2 = await prisma.post.create({
    data: {
      title: 'My Second Post',
      content: 'This is even better than the first one!',
      published: true,
      authorId: alice.id,
    },
  })
  
  const post3 = await prisma.post.create({
    data: {
      title: 'Bob\'s Thoughts',
      content: 'This is what I think about things...',
      published: false,
      authorId: bob.id,
    },
  })
  
  console.log('Created posts:', { post1, post2, post3 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
