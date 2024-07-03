const request = require('supertest');
const app = require('../../app');

describe('Test /events endpoint', () => {
  test('GET should respond 200 success', async () => {
    const response = await request(app)
      .get('/events')
      .expect('Content-Type', /json/)
      .expect(200);
  });
  test('POST should respond 201 success', async () => {
    const originalEvent = {
      summary: 'test event',
    };
    const response = await request(app)
      .post('/events')
      .send(originalEvent)
      .expect('Content-Type', /json/)
      .expect(201);
    const { createDate, id, ...restBody } = response.body;
    expect(restBody).toMatchObject(originalEvent)
    expect(id).toBeDefined();
    expect(createDate).toBeDefined();
  })
});
