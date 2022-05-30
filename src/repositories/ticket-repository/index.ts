import { prisma } from '@/config';
import { Enrollment } from '@prisma/client';

async function findByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
  });
}

const ticketRepository = {
  findByEnrollmentId,
};

export default ticketRepository;
