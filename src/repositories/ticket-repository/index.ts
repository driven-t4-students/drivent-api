import { prisma } from '@/config';
import { Ticket } from '@prisma/client';

async function findByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
  });
}

export type ticket = Omit<Ticket, 'id'>;

async function createTicket(data: ticket) {
  return prisma.ticket.create({
    data,
  });
}

const ticketRepository = {
  findByEnrollmentId,
  createTicket,
};

export default ticketRepository;
