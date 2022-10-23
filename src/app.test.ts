import app from './app';
import request from 'supertest';

describe('GET /', () => {
  it('returns hello world on / request', async () => {
    const res = await request(app).get('/');
    const expected = { message: 'hello world' };
    expect(expected);
  });
});
