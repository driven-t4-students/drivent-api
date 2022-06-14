import { notFoundError } from '@/errors';
import bedRepository from '@/repositories/bed-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { Bed } from '@prisma/client';
import ticketsService from '../tickets-service';

export async function createBooking(ticketId: number, bedId: number) {
  await ticketsService.getById(ticketId);

  await getById(bedId);

  await ticketRepository.createBooking(ticketId, bedId);
}

async function getById(id: number): Promise<Bed> {
  const bed = await bedRepository.findById(id);
  if (!bed) throw notFoundError();

  return bed;
}

const bedService = { createBooking };

export default bedService;
