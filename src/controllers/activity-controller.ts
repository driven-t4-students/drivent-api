/* eslint-disable no-console */
import activityService from '@/services/activity-service';

import { Response, Request } from 'express';

export async function getAllActivities(req: Request, res: Response) {
  const data = await activityService.getActivities();

  return res.status(200).send(data);
}

export async function subscribyOnActivity(req: Request, res: Response) {
  const { subscriptionId, ticketId } = req.body;
  const data = await activityService.subscribyOnActivity(subscriptionId, ticketId);

  return res.status(200).send(data);
}
