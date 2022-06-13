import roomRepository from '@/repositories/room-repository';

async function getById(roomId: number) {
  const beds = await roomRepository.findFirstById(roomId);

  return beds;
}

const roomsService = {
  getById,
};

export default roomsService;
