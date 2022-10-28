import request from 'supertest';

import app from './app';

describe('/ route', () => {
  it('GET returns hello world on / request', async () => {
    const res = await request(app).get('/');
    const expected = { message: 'Not authorized' };
    expect(expected).toMatchObject(res.body);
  });
});
