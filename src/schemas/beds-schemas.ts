import Joi from 'joi';

export const createBookingSchema = Joi.object({
  ticketId: Joi.number().required(),
});
