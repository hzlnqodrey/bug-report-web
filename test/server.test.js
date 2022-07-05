const app = require('../app.js');
const request = require('supertest');

describe('gae_flex_quickstart', () => {
  describe('GET /', () => {
    it('should get 200', done => {
      request(app).get('/').expect(200, done);
    });
  });
});

describe('gae_node_request_example', () => {
    describe('GET /', () => {
      it('should get 200', done => {
        request(app).get('/').expect(200, done);
      });
    });
});