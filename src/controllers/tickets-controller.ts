import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';
import { Response } from 'express';

export async function getTicketByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const ticket = await ticketsService.getByUserId(userId);

  return res.send(ticket);
}
