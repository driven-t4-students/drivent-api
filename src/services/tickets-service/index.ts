import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import { Ticket, TicketType } from '@prisma/client';
import enrollmentsService from '../enrollments-service';

async function getByUserId(userId: number): Promise<Ticket> {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);

  const ticket = await ticketRepository.findByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  return ticket;
}
async function getById(id: number): Promise<Ticket> {
  const ticket = await ticketRepository.findById(id);
  if (!ticket) throw notFoundError();

  return ticket;
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

  const data: Omit<Ticket, 'id'> = { type, totalValue, hotel, enrollmentId, bedId: null, activitySubscriptionId: null };

  await ticketRepository.createTicket(data);
}

const ticketsService = {
  getByUserId,
  createBookingTickets,
  getById,
};
export default ticketsService;
