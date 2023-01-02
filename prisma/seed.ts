import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { email: 'CI@gmail.com' },
    update: {},
    create: {
      email: 'CI@gmail.com',
      firstName: 'CI admin',
      lastName: 'CI admin',
      role: 'ADMIN',
      // eslint-disable-next-line line-comment-position
      password: '$2b$10$AVzOzjgle8jTpZqvAdjTNere73KxU4bP.vEw.HvM9PPe0TLhj70/e', // admin
      phoneNumber: 0,
    },
  });
  await prisma.user.upsert({
    where: { email: 'CI1@gmail.com' },
    update: {},
    create: {
      email: 'CI1@gmail.com',
      firstName: 'CI basic',
      lastName: 'CI basic',
      role: 'BASIC',
      password: '$2b$10$AVzOzjgle8jTpZqvAdjTNere73KxU4bP.vEw.HvM9PPe0TLhj70/e',
      phoneNumber: 0,
    },
  });

  await prisma.article.upsert({
    where: { id: '1' },
    update: {},
    create: {
      categoryId: '123',
      title: 'Article 2',
      content: 'testContent',
      id: '1',
      image_id: '123',
      createdAt: '213',
      updatedAt: '123',
      view: 123,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
