import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllHotels, getRoomsById } from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getAllHotels).get('/:hotelId/rooms', getRoomsById);

export { hotelsRouter };
