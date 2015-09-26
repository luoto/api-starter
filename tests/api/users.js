// TODO: Need more tests!

var config = require('../../src/api/config');
var async = require('async');
var expect = require('chai').expect;
var request = require('supertest');
var mongoose = require('mongoose');

var app = require('../../src/api/server').listen(3000);
var validToken;

describe('User', function() {

  var Session = require('supertest-session')({app: app});
  var agent = new Session();

  before(function(done) {

    function dropDatabase(next) {
      var connection = mongoose.createConnection(
        config.db.host,
        config.db.name,
        config.db.port,
        function(err) {
          if (err) {
            next(err);
          } else {
            connection.db.dropDatabase(next);
          }
        });
    }

    function initAgent(next) {
      var testUser = {
        username: 'tester1',
        password: 'tester1',
        email: 'test@gmail.com'
      };

      agent.post('/api/users/signup')
        .send({user: testUser})
        .expect(200, next);
    }

    async.series([dropDatabase, initAgent], done);
  });

  it('Unregistered users cannot login', function(done) {
    request(app)
      .post('/api/users/login')
      .send({user: {username: 'spam', password: 'test', email: 'test1@gmail.com'}})
      .expect(400)
      .end(done);
  });

  it('Registered users are authenticated', function(done) {
    request(app)
      .post('/api/users/login')
      .send({user: {username: 'tester1', password: 'tester1', email: 'test@gmail.com'}})
      .expect(function(res) {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        validToken = res.body.data.token;
      })
      .end(done);
  });

  // FIXME: dependant on previous test case
  it('Authenticated user are not authorized to access other user\'s information', function(done) {
    request(app)
      .get('/api/users/john?token=' + validToken)
      .expect(401)
      .end(done);
  });

  // FIXME: dependant on previous test case
  it('Authenticated user authorized to access own information', function(done) {
    request(app)
      .get('/api/users/tester1?token=' + validToken)
      .expect(200)
      .end(done);
  });

  it('Unauthenticated users are denied access', function(done) {
    request(app)
      .get('/api/users/tester1')
      .expect(401)
      .end(done);
  });

});
