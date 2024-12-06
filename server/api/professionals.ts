import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const professionals = await prisma.professionals.findMany();

  return professionals;
});
