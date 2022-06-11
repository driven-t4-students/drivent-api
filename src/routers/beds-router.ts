import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createBooking } from '@/controllers/beds-controller';
import { createBookingSchema } from '@/schemas/beds-schemas';

const bedsRouter = Router();

bedsRouter.all('/*', authenticateToken).post('/:bedId', validateBody(createBookingSchema), createBooking);

export { bedsRouter };
