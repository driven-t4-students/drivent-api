import { prisma } from '@/config';

async function findAllHotels() {
  return prisma.hotel.findMany({
    include: {
      Room: true,
    },
  });
}

const hotelRepository = {
  findAllHotels,
};

export default hotelRepository;
