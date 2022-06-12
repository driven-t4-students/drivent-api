import { prisma } from '@/config';

export async function findManyByHotelId(hotelId: number) {
  return prisma.room.findMany({ where: { hotelId }, include: { Bed: { include: { Ticket: true } } } });
}

export async function findFirstById(id: number) {
  return prisma.room.findFirst({ where: { id }, include: { Bed: { include: { Ticket: true } } } });
}

const roomRepository = {
  findManyByHotelId,
  findFirstById,
};

export default roomRepository;
