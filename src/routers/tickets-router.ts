import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createBooking, getTicketByUser } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/', getTicketByUser).post('/reservTicket', createBooking);

export { ticketsRouter };
