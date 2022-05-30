import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import eventRepository from '@/repositories/event-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { exclude } from '@/utils/prisma-utils';
import { Ticket } from '@prisma/client';
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

const ticketsService = {
  getByUserId,
};

export default ticketsService;
