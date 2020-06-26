const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');

const assert = chai.assert;
chai.use(chaiHttp);

describe('API routes', () => {
  describe('GET /api.users', () => {
    it('It should return an array of users in database', done => {
      chai
      .request(server)
      .get('/api/users')
      .end((err, res) => {
        assert.isNull(err, 'No errors should be thrown.');
        assert.equal(res.status, 200, 'Response status should be 200.');
        assert.typeOf(res.body, 'array', 'Response should be an array.');
        assert.isAtLeast(res.body.length, 1, 'Response array should contain one or more users.');
        done();
      });
    });
  });

  describe('POST /api.users', () => {
    it('It should create a new user instance in database', done => {
      chai
      .request(server)
      .post('/api/users')
      .send({
        "email": "geo@dude.com",
        "password": "sp0kaN3?",
        "fistName": "Angela",
        "lastName": "Perkins",
        "location": "San Diego, CA"
      })
      .end((err, res) => {
        assert.isNull(err, 'No errors should be thrown.');
        assert.typeOf(res.body, 'object', 'Response should be an object.');
        done();
      });
    });
  });

  describe('GET /api/users/id', () => {
    it('It should return the selected user by id', done => {
      chai
      .request(server)
      .get('/api/users/5ef62c0af735f308d7f335b7')
      .end((err, res) => {
        assert.isNull(err, 'No errors should be thrown.');
        assert.typeOf(res.body, 'object', 'Response should be an object.');
        done();
      })

    })
  })

});