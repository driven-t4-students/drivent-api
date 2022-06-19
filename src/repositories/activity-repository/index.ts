import { prisma } from '@/config';

async function findManyActivities() {
  return prisma.activity.findMany({
    include: { ActivitySubscription: { include: { Ticket: true } } },
  });
}

async function uptadeSubscriptionOnActivity(
  subscriptionId: number,
  ticketId: number,
  cancelSubscription: number | null,
) {
  let data = await prisma.activitySubscription.findFirst({
    where: {
      activityId: subscriptionId,
      Ticket: null,
    },
  });

  if (cancelSubscription === null) {
    data = await prisma.activitySubscription.findFirst({
      where: {
        activityId: subscriptionId,
        ticketId: ticketId,
      },
    });

    return await prisma.activitySubscription.update({
      where: {
        id: data.id,
      },
      data: {
        ticketId: null,
      },
    });
  }

  return await prisma.activitySubscription.update({
    where: {
      id: data.id,
    },
    data: {
      ticketId: ticketId,
    },
  });
}

const activityRepository = {
  findManyActivities,
  uptadeSubscriptionOnActivity,
};

export default activityRepository;
