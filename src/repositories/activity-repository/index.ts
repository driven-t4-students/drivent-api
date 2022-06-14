import { prisma } from '@/config';

async function findManyActivities() {
  return prisma.activity.findMany();
}

const activityRepository = {
  findManyActivities,
};

export default activityRepository;
