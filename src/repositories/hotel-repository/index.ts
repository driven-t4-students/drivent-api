import { prisma } from '@/config';

async function findAllHotels() {
  return prisma.hotel.findMany({
    include: {
      Room: true,
    },
  });
}

async function findById(id: number) {
  return prisma.hotel.findUnique({ where: { id } });
}

const hotelRepository = {
  findAllHotels,
  findById,
};

export default hotelRepository;
