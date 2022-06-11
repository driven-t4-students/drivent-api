import hotelsRepository from '@/repositories/hotel-repository';

async function getHotels() {
  const hotels = await hotelsRepository.findAllHotels();

  return {
    hotels,
  };
}

async function getHotelsByBedId(id: number) {
  const hotels = await hotelsRepository.findHotelByBedId(id);

  return {
    hotels,
  };
}

const hotelsService = {
  getHotels,
  getHotelsByBedId,
};

export default hotelsService;
