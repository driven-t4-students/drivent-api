import { Response } from 'express';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';
import bedsService from '@/services/beds-service';

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { bedId } = req.params;

  const ticket = await ticketsService.getByUserId(userId);

  await bedsService.createBooking(ticket.id, +bedId);

  res.sendStatus(201);
}
