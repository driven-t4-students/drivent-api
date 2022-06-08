import { redis } from '@/config';

export interface Event {
  title: string;
  backgroundImageUrl: string;
  logoImageUrl: string;
  startsAt: string;
  endsAt: string;
}

async function findFirst() {
  await redis.connect();
  const title = await redis.get('title');
  const backgroundImageUrl = await redis.get('backgroundImageUrl');
  const logoImageUrl = await redis.get('logoImageUrl');
  const startsAt = await redis.get('startsAt');
  const endsAt = await redis.get('endsAt');
  await redis.disconnect();

  if (title === null) return null;

  const event = { title, backgroundImageUrl, logoImageUrl, startsAt, endsAt };
  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
