import request from 'supertest';

import app from '../../app';

describe('Registration', () => {
  it('registers new user', async () => {
    const payload = {
      firstName: 'test',
      lastName: 'ci',
      email: 'ci2@gmail.com',
      password: '22222222',
      passwordConfirm: '22222222',
    };
    const res = await request(app).post('/v1/auth/register').send(payload);
    expect(res.body.success).toBe(true);
  });
  it('displays error when incomplete data is submitted', async () => {
    const payload = {
      firstName: 'test',
      lastName: 'ci',
      email: 'ci',
      password: '2222',
      passwordConfirm: '222',
    };
    const res = await request(app).post('/v1/auth/register').send(payload);
    expect(res.body.status).toBe('fail');
    expect(res.statusCode).toBe(400);
  });
});
