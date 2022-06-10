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
  return prisma.hotel.findUnique({
    where: { id },
    include: {
      Room: {
        include: {
          Bed: true,
        },
      },
    },
  });
}

const hotelRepository = {
  findAllHotels,
  findHotelByBedId,
};

export default hotelRepository;
