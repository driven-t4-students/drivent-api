import { prisma } from '@/config';

export async function findManyByHotelId(hotelId: number) {
  return prisma.room.findMany({ where: { hotelId }, include: { Bed: { include: { Ticket: true } } } });
}

const roomRepository = {
  findManyByHotelId,
};

export default roomRepository;
