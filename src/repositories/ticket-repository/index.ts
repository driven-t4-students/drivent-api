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

async function findById(id: number) {
  return prisma.ticket.findFirst({
    where: { id },
  });
}

async function createBooking(ticketId: number, bedId: number) {
  return prisma.ticket.update({ where: { id: ticketId }, data: { bedId: bedId } });
}

async function getTicketWithSubscription(id: number) {
  return await prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      activitySubscriptionId: true,
    },
  });
}

const ticketRepository = {
  findByEnrollmentId,
  createTicket,
  findById,
  createBooking,
  getTicketWithSubscription,
};

export default ticketRepository;
