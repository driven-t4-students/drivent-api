import { Response, Request } from 'express';
import hotelService from '@/services/hotels-service';

export async function getAllHotels(req: Request, res: Response) {
  const data = await hotelService.getHotels();
  return res.status(200).send(data);
}
