import request from 'supertest';

import app from '../../app';

describe('Login', () => {
  it('displays errors on invalid password or email format', async () => {
    const payload = {
      email: 'CI1',
      password: 'CI',
    };
    const res = await request(app).post('/v1/auth/login').send(payload);

    expect(res.body.status).toBe('fail');
    expect(res.statusCode).toBe(400);
  });

  it('displays error when user inputs incorrect password or email', async () => {
    const payload = {
      email: 'CI1@gmail.com',
      password: '222221222',
    };
    const res = await request(app).post('/v1/auth/login').send(payload);

    expect(res.body.success).toBe(false);
  });
  it('sends proper response when user inputs proper credentials', async () => {
    const payload = {
      email: 'CI1@gmail.com',
      password: 'CI@gmail.com',
    };
    const res = await request(app).post('/v1/auth/login').send(payload);
    expect(res.body.success).toBe(true);
    expect(res.statusCode).toBe(200);

    const logout = await request(app).delete('/v1/auth/logout');
    expect(logout.body.success).toBe(true);
    expect(logout.statusCode).toBe(200);
  });
});
