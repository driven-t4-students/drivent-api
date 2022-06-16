import { prisma } from '@/config';

async function findManyActivities() {
  return prisma.activity.findMany({ include: { ActivitySubscription: { include: { Ticket: true } } } });
}

const activityRepository = {
  findManyActivities,
};

export default activityRepository;
