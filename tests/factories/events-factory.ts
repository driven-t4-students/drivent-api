import { redis } from '@/config';
import { Event } from '@/repositories/event-repository';
import faker from '@faker-js/faker';
import dayjs from 'dayjs';

export async function createEvent(params: Partial<Event> = {}): Promise<Event> {
  const set = {
    title: params.title || faker.lorem.sentence(),
    backgroundImageUrl: params.backgroundImageUrl || faker.image.imageUrl(),
    logoImageUrl: params.logoImageUrl || faker.image.imageUrl(),
    startsAt: params.startsAt || dayjs().subtract(1, 'day').toDate().toString(),
    endsAt: params.endsAt || dayjs().add(5, 'days').toDate().toString(),
  };

  await redis.set('title', set.title);
  await redis.set('backgroundImageUrl', set.backgroundImageUrl);
  await redis.set('logoImageUrl', set.logoImageUrl);
  await redis.set('startsAt', set.startsAt);
  await redis.set('endsAt', set.endsAt);

  const title = await redis.get('title');
  const backgroundImageUrl = await redis.get('backgroundImageUrl');
  const logoImageUrl = await redis.get('logoImageUrl');
  const startsAt = await redis.get('startsAt');
  const endsAt = await redis.get('endsAt');

  const event = { title, backgroundImageUrl, logoImageUrl, startsAt, endsAt };
  return event;
}
