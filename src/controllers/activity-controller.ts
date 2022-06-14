/* eslint-disable no-console */
import activityService from '@/services/activity-service';

import { Response, Request } from 'express';

export async function getAllActivities(req: Request, res: Response) {
  const data = await activityService.getActivities();

  return res.status(200).send(data);
}
