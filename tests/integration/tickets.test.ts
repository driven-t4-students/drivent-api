/* eslint-disable no-console */
import app, { close, init } from '@/app';
import { exclude } from '@/utils/prisma-utils';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createEnrollmentWithAddress, createUser } from '../factories';
import { createTicket } from '../factories/tickets-factoy';
import { cleanDb, generateValidToken } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
});

afterAll(async () => {
  await cleanDb();
  await close();
});

const server = supertest(app);

describe('GET /tickets', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/tickets');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/tickets').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should return status 404 when there is no ticket for given user', async () => {
      const token = await generateValidToken();

      const response = await server.get('/tickets').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with ticket data when there is a ticket for given user', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);

      const ticket = await createTicket(enrollment);
      const expectedTicket = {
        ...exclude(ticket, 'id', 'enrollmentId'),
      };

      const response = await server.get('/tickets').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(expectedTicket).toEqual(response.body);
    });
  });
});
