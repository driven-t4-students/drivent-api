import roomsService from '@/services/rooms-service';
import { Response, Request } from 'express';

export async function getById(req: Request, res: Response) {
  const { id } = req.params;

  const beds = await roomsService.getById(+id);
  return res.status(200).send(beds);
}
