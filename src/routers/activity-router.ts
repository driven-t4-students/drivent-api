import { getAllActivities, subscribyOnActivity } from '@/controllers/activity-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const activityRouter = Router();

activityRouter.all('/*', authenticateToken).get('/', getAllActivities).post('/', subscribyOnActivity);
export { activityRouter };
