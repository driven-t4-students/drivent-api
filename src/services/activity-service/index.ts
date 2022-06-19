import activityRepository from '@/repositories/activity-repository';

async function getActivities() {
  const activities = await activityRepository.findManyActivities();
  return {
    activities,
  };
}

async function subscribyOnActivity(subscriptionId: number, ticketId: number) {
  const activities = await activityRepository.subscribyOnActivity(subscriptionId, ticketId);
  return {
    activities,
  };
}

const activityService = {
  getActivities,
  subscribyOnActivity,
};

export default activityService;
