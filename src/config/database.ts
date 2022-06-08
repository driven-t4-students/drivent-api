import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import 'dotenv/config';

export let prisma: PrismaClient;

export function connectDb(): void {
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}

export const redis = createClient({
  url: process.env.REDIS_URL,
});

// eslint-disable-next-line no-console
redis.on('error', (err: Error) => console.log('Redis Client Error:', err));
