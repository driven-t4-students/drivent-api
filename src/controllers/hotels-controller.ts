import { Response, Request } from 'express';
import hotelService from '@/services/hotels-service';

export async function getAllHotels(req: Request, res: Response) {
  const data = await hotelService.getHotels();
  return res.status(200).send(data);
}

export async function getRoomsById(req: Request, res: Response) {
  const { hotelId } = req.params;

  const rooms = await hotelService.getRoomsById(+hotelId);

  res.send(rooms);
}
