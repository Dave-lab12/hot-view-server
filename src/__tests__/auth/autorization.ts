import request from 'supertest';

import app from '../../app';

const agent = request.agent(app);
describe('Authorization', () => {
  it('admin protected route', async () => {
    const payload = {
      email: 'CI@gmail.com',
      password: 'CI@gmail.com',
    };
    const res = await agent
      .post('/api/v1/auth/login')
      .send(payload)
      .expect('set-cookie', /connect.sid/);
    expect(res.body.success).toBe(true);

    const cookies = res.headers['set-cookie'];

    // const getCookieString = (cookie: string) =>
    //   cookie.split('=')[1].split(';')[0];
    // console.log(cookies);

    const adminRoute = await agent
      .get('/api/v1/admin/dashboard')
      .set('Cookie', cookies);

    // .set('Cookie', cookies);
    expect(adminRoute.body).toBe('admin route');
  });

  it('displays authorization error when unauthorized user tries to request data', async () => {
    const payload = {
      email: 'CI1@gmail.com',
      password: 'CI@gmail.com',
    };
    const res = await request(app).post('/api/v1/auth/login').send(payload);
    expect(res.body.success).toBe(true);
    const adminRoute = await request(app).get('/api/v1/admin/dashboard');
    expect(adminRoute.body.success).toBe(false);
  });
});
