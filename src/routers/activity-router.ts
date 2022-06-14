import { getAllActivities } from '@/controllers/activity-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const activityRouter = Router();

activityRouter.all('/*', authenticateToken).get('/', getAllActivities);
export { activityRouter };
