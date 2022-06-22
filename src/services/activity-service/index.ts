import activityRepository from '@/repositories/activity-repository';

async function getActivities() {
  const activities = await activityRepository.findManyActivities();
  return {
    activities,
  };
}

async function uptadeSubscriptionOnActivity(
  subscriptionId: number,
  ticketId: number,
  cancelSubscription: number | null,
) {
  const activities = await activityRepository.uptadeSubscriptionOnActivity(
    subscriptionId,
    ticketId,
    cancelSubscription,
  );
  return {
    activities,
  };
}

const activityService = {
  getActivities,
  uptadeSubscriptionOnActivity,
};

export default activityService;
