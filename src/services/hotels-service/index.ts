import hotelsRepository from '@/repositories/hotel-repository';
import roomRepository from '@/repositories/room-repository';
import { HotelNotFound } from './errors';

async function getHotels() {
  const hotels = await hotelsRepository.findAllHotels();

  return {
    hotels,
  };
}

async function getRoomsById(hotelId: number) {
  await ValidateHotelId(hotelId);

  const rooms = await roomRepository.findManyByHotelId(hotelId);

  return rooms;
}

async function ValidateHotelId(hotelId: number) {
  const hotel = await hotelsRepository.findById(hotelId);

  if (!hotel) throw HotelNotFound();
}

async function getHotelsByBedId(id: number) {
  const hotels = await hotelsRepository.findHotelByBedId(id);

  return {
    hotels,
  };
}

const hotelsService = {
  getHotels,
  getRoomsById,
  getHotelsByBedId,
};

export default hotelsService;
