import { notFoundError } from '@/errors';
import eventRepository, { Event } from '@/repositories/event-repository';
import dayjs from 'dayjs';

async function getFirstEvent(): Promise<GetFirstEventResult> {
  const event = await eventRepository.findFirst();
  if (!event) throw notFoundError();

  return event;
}

export type GetFirstEventResult = Event;

async function isCurrentEventActive(): Promise<boolean> {
  const event = await eventRepository.findFirst();
  if (!event) return false;

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}

const eventsService = {
  getFirstEvent,
  isCurrentEventActive,
};

export default eventsService;
