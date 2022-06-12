import { prisma } from '@/config';

async function findAllHotels() {
  return prisma.hotel.findMany({
    include: {
      Room: {
        include: {
          Bed: true,
        },
      },
    },
  });
}

async function findHotelByBedId(id: number) {
  return prisma.bed.findUnique({
    where: { id },
    include: {
      room: {
        include: {
          Hotel: true,
        },
      },
    },
  });
}

async function findById(id: number) {
  return prisma.hotel.findUnique({ where: { id } });
}

const hotelRepository = {
  findAllHotels,
  findById,
  findHotelByBedId,
};

export default hotelRepository;
