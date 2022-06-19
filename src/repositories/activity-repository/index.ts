import { prisma } from '@/config';

async function findManyActivities() {
  return prisma.activity.findMany({
    include: { ActivitySubscription: { include: { Ticket: true } } },
  });
}

async function subscribyOnActivity(subscriptionId: number, ticketId: number) {
  const data = await prisma.activitySubscription.findFirst({
    where: {
      activityId: subscriptionId,
      Ticket: null,
    },
  });

  return await prisma.ticket.findUnique({
    where: {
      id: 1,
    },
    include: {
      activitySubscriptionId: true,
    },
  });

  // await prisma.activitySubscription.update({
  //   where: {
  //     id: data.id,
  //   },
  //   data: {
  //     ticketId: ticketId,
  //   },
  // });
}

const activityRepository = {
  findManyActivities,
  subscribyOnActivity,
};

export default activityRepository;
