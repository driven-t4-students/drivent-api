import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getById } from '@/controllers/rooms-controller';

const roomsRouter = Router();

roomsRouter.all('/*', authenticateToken).get('/:id', getById);

export { roomsRouter };
