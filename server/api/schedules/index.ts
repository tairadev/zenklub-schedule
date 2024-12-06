import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const body = await readBody(event);

  if (method === 'GET') {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const schedules = await prisma.schedules.findMany({
        where: {
          dateTime: {
            gte: today,
          },
        },
      });

      return schedules;
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: 'Erro ao buscar os agendamentos',
      });
    }
  }

  if (method === 'PUT') {
    if (
      !body ||
      !body.dateTime ||
      !body.name ||
      !body.phone ||
      !body.email ||
      !body.document ||
      !body.professional_id
    ) {
      throw createError({
        statusCode: 400,
        message:
          'Dados insuficientes para criar o agendamento. Verifique os campos obrigatórios.',
      });
    }

    try {
      const newSchedule = await prisma.schedules.create({
        data: {
          professional_id: body.professional_id,
          dateTime: new Date(body.dateTime),
          name: body.name,
          phone: body.phone,
          email: body.email,
          document: body.document,
        },
      });

      return newSchedule;
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: 'Erro ao criar o agendamento. Tente novamente mais tarde.',
      });
    }
  }

  throw createError({
    statusCode: 405,
    message: `Método ${method} não permitido para esta rota.`,
  });
});
