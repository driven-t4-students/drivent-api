import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';
import { Response, Request } from 'express';

export async function getTicketByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const ticket = await ticketsService.getByUserId(userId);

  return res.send(ticket);
}

export async function createBooking(req: Request, res: Response) {
  await ticketsService.createBookingTickets(req.body);

  res.sendStatus(201);
}

export async function getTicketWithSubscription(req: Request, res: Response) {
  const { id } = req.params;

  const data = await ticketsService.getTicketWithSubscription(parseInt(id));

  res.status(200).send(data);
}
