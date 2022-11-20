import request from 'supertest';

import config from '../../config/default';
import app from '../app';

describe('Login', () => {
  it('displays errors on invalid credentials', async () => {
    const payload = {
      email: 'test@gmail.com',
      password: '22222222',
    };
    const res = await request(app).post('/api/v1/auth/login').send(payload);
    const expected = { message: 'User not registered' };
    expect(expected).toMatchObject(res.body);
  });

  it('displays error when user inputs invalid password or email', async () => {
    const payload = {
      email: 'test',
      password: '222',
    };
    const res = await request(app).post('/api/v1/auth/login').send(payload);
    const expected = {
      status: 'fail',
      error: [
        {
          validation: 'email',
          code: 'invalid_string',
          message: 'Invalid email or password',
          path: ['body', 'email'],
        },
        {
          code: 'too_small',
          minimum: 8,
          type: 'string',
          inclusive: true,
          message: 'Invalid email or password',
          path: ['body', 'password'],
        },
      ],
    };
    expect(expected).toMatchObject(res.body);
  });
  it('sends proper response when user inputs proper credentials', async () => {
    const payload = {
      email: config.test.email,
      password: config.test.password,
    };
    const res = await request(app).post('/api/v1/auth/login').send(payload);
    expect(res.body.success).toBe(true);
    expect(res.statusCode).toBe(200);
  });
});
