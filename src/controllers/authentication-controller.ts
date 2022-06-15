import authenticationService, { SignInParams } from '@/services/authentication-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import axios from 'axios';
import generator from 'generate-password';
import userService from '@/services/users-service';
import userRepository from '@/repositories/user-repository';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  const result = await authenticationService.signIn({ email, password });

  res.status(httpStatus.OK).send(result);
}

export async function githubToken(req: Request, res: Response) {
  const { code } = req.body;

  const clientId = '66848e74700a296048c1';
  const clientSecret = '46134ca4c07a2d90ff0ba6b411ecac328aae3fb8';

  const response = await axios.post(
    `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
  );

  const token = response.data;

  const validate = token.split('=');
  const newTest = validate[1].split('&');
  const newToken = newTest[0];

  const userResponse = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${newToken}`,
    },
  });

  const email = userResponse.data.email;

  if (!email) {
    return res.status(404).send('Github email private');
  }

  const existingUser = await userRepository.findByEmail(email);

  if (!existingUser) {
    const user = await createdGithubUser(email);
    const password = user.password;
    const result = await authenticationService.signIn({ email, password });
    res.status(httpStatus.OK).send(result);
  } else {
    const password = existingUser.password;
    const result = await authenticationService.signIn({ email, password });
    res.status(httpStatus.OK).send(result);
  }
}

async function createdGithubUser(email: string) {
  const password = generator.generate({
    length: 10,
    numbers: true,
  });
  const github = true;
  const user = await userService.createUser({ email, password, github });
  return user;
}
