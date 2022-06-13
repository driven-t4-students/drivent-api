import { ApplicationError } from '@/protocols';

export function HotelNotFound(): ApplicationError {
  return {
    name: 'NotFoundError',
    message: 'There is no hotel with given id',
  };
}
