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
      password: '$2b$10$AVzOzjgle8jTpZqvAdjTNere73KxU4bP.vEw.HvM9PPe0TLhj70/e',
      phoneNumber: 0,
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
