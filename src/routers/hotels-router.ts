import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllHotels, getRoomsById, getHotelByBedId } from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('/', getAllHotels)
  .get('/:id', getHotelByBedId)
  .get('/:hotelId/rooms', getRoomsById);

export { hotelsRouter };
