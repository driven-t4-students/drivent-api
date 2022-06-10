import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllHotels, getHotelByBedId } from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getAllHotels).get('/:id', getHotelByBedId);

export { hotelsRouter };
