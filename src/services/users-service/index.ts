import { cannotEnrollBeforeStartDateError } from '@/errors';
import userRepository from '@/repositories/user-repository';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import eventsService from '../events-service';
import { duplicatedEmailError } from './errors';

export async function createUser({ email, password, github }: CreateUserParams): Promise<User> {
  await canEnrollOrFail();

  await validateUniqueEmailOrFail(email);
  let hashedPassword = password;
  if (!github) {
    hashedPassword = await bcrypt.hash(password, 12);
  }
  return userRepository.create({
    email,
    password: hashedPassword,
    github,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function canEnrollOrFail() {
  const canEnroll = await eventsService.isCurrentEventActive();
  if (!canEnroll) {
    throw cannotEnrollBeforeStartDateError();
  }
}

export type CreateUserParams = Pick<User, 'email' | 'password' | 'github'>;

const userService = {
  createUser,
};

export * from './errors';
export default userService;
