import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import 'dotenv/config';

export let prisma: PrismaClient;
export const redis = createClient({
  url: process.env.REDIS_URL,
});

export async function connectDb(): Promise<void> {
  // eslint-disable-next-line no-console
  redis.on('error', (err: Error) => console.log('Redis Client Error:', err));
  await redis.connect();

  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await redis.disconnect();
  await prisma?.$disconnect();
}
