import hotelsRepository from '@/repositories/hotel-repository';

async function getHotels() {
  const hotels = await hotelsRepository.findAllHotels();

  return {
    hotels,
  };
}

const hotelsService = {
  getHotels,
};

export default hotelsService;
