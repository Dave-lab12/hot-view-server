import request from 'supertest';

import app from './app';

describe('/ route', () => {
  it('GET returns hello world on / request', async () => {
    const res = await request(app).get('/');
    const expected = { message: 'hello world' };
    expect(expected).toMatchObject(res.body);
  });
});

describe('/signup', () => {
  it('POST creates user',async () => {
    const res = await request(app).post('/signup');
    const expected = 200;
    expect(expected).toBe(res.statusCode);
  })
})
