import { conflictError, notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import { exclude } from '@/utils/prisma-utils';
import { Ticket, TicketType } from '@prisma/client';
import enrollmentsService from '../enrollments-service';

async function getByUserId(userId: number): Promise<ticket> {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);

  const ticket = await ticketRepository.findByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  return {
    ...exclude(ticket, 'id', 'enrollmentId'),
  };
}

export type ticket = Omit<Ticket, 'id' | 'enrollmentId'>;
export interface createTicket {
  userId: number;
  type: TicketType;
  totalValue: number;
  hotel: boolean;
}

async function createBookingTickets(formData: createTicket) {
  const { userId, type, totalValue, hotel } = formData;
  const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();
  const enrollmentId = enrollment.id;

  const data = { type, totalValue, hotel, enrollmentId };

  await ticketRepository.createTicket(data);
}

const ticketsService = {
  getByUserId,
  createBookingTickets,
};
export default ticketsService;
