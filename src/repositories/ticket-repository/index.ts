import { prisma } from '@/config';

async function findByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
  });
}

const ticketRepository = {
  findByEnrollmentId,
};

export default ticketRepository;
