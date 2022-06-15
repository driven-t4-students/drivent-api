/* eslint-disable no-console */
import dayjs from 'dayjs';
import { createClient } from 'redis';

console.log('Seeding redis...');

async function main() {
  const redis = createClient({
    url: process.env.REDIS_URL,
  });

  redis.on('error', (err: Error) => {
    console.log('Redis Client Error', err);
    process.exit(1);
  });

  const data = {
    title: 'Driven.t',
    backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
    logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
    startsAt: dayjs().toDate().toString(),
    endsAt: dayjs().add(21, 'days').toDate().toString(),
  };

  await redis.connect();

  await redis.flushAll();

  await redis.set('title', data.title);
  await redis.set('backgroundImageUrl', data.backgroundImageUrl);
  await redis.set('logoImageUrl', data.logoImageUrl);
  await redis.set('startsAt', data.startsAt);
  await redis.set('endsAt', data.endsAt);

  await redis.disconnect();

  console.log({ data });
  console.log('Done!');
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
