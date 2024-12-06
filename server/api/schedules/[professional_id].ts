import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const params = event.context.params;

  if (!params || !params.professional_id)
    throw new Error('Parâmetro professional_id é obrigatório');

  const { professional_id } = params;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const schedules = await prisma.schedules.findMany({
    where: {
      professional_id,
      dateTime: {
        gte: today,
      },
    },
  });

  return schedules;
});
