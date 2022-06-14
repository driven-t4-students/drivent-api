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

const hotelRepository = {
  findAllHotels,
};

export default hotelRepository;
