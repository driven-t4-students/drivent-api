import { Enrollment } from '@prisma/client';
import { prisma } from '@/config';
import { createEnrollmentWithAddress } from './enrollments-factory';

export async function createTicket(enrollment?: Enrollment) {
  const incomingEnrollment = enrollment || (await createEnrollmentWithAddress());

  return prisma.ticket.create({
    data: {
      type: 'online',
      totalValue: 100,
      enrollmentId: incomingEnrollment.id,
    },
  });
}
