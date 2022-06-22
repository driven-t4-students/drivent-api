import { prisma, redis } from '@/config';

async function findAllHotels() {
  const hotelsCache = await redis.get('hotels');

  if (!hotelsCache || (Array.isArray(hotelsCache) && hotelsCache.length === 0)) {
    const hotels = await prisma.hotel.findMany({
      include: {
        Room: {
          include: {
            Bed: true,
          },
        },
      },
    });

    await redis.set('hotels', JSON.stringify(hotels));
    return hotels;
  }

  return JSON.parse(hotelsCache);
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
