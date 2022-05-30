import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicketByUser } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/', getTicketByUser);

export { ticketsRouter };
