import request from 'supertest';

import app from '../../app';

const agent = request.agent(app);

describe('Authorization', () => {
  it('admin protected route', async () => {
    const payload = {
      email: 'CI@gmail.com',
      password: 'CI@gmail.com',
    };
    const logout = await request(app).delete('/v1/auth/logout');
    expect(logout.body.success).toBe(true);

    const res = await request(app).post('/v1/auth/login').send(payload);
    expect(res.body.success).toBe(true);
    const { header } = res;

    const adminRoute = await agent
      .get('/api/v1/admin/dashboard')
      .set('Cookie', [...header['set-cookie']]);

    expect(adminRoute.body.success).toBe(true);
    expect(adminRoute.body.data).toBe('admin');
  });

  it('displays authorization error when unauthorized user tries to request data', async () => {
    const payload = {
      email: 'CI1@gmail.com',
      password: 'CI@gmail.com',
    };
    const res = await request(app).post('/v1/auth/login').send(payload);
    expect(res.body.success).toBe(true);
    const adminRoute = await request(app).get('/v1/admin/dashboard');
    expect(adminRoute.body.success).toBe(false);
  });
});
