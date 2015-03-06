/* jshint expr:true */
var cwd = process.cwd();

var chai    = require('chai'),
    expect  = chai.expect,
    moment  = require('moment'),
    _       = require('lodash'),
    chalk   = require('chalk'),
    winston = require('winston'),
    mongoose = require('mongoose'),
    Promise = require('bluebird'); // jshint ignore:line

var plugins = [
  require('chai-as-promised'),
  require('chai-http')
];

plugins.map(function ( plugin ) {
  chai.use( plugin );
});

chai.request.addPromises(Promise);

var app  = require(cwd + '/app').init( require('express')() ),
    User = require(cwd + '/models/user');

describe('User :: User Creation', function () {
  /* Test support */
  before(function ( done ) {
    done();//mongoose.connection.one('connected', done);
  });

  after(function ( done ) {
    mongoose.connection.db.dropDatabase(done);
  });
  /* ./ Test support */

  it('should reject invalid requests', function ( done ) {
    var _expectInvalidPayload = function ( res ) {
      expect(res).to.have.status(400);
      expect(res.error.text.toLowerCase()).to.contain('payload');
    };

    var _expectInvalidRequest = function ( res ) {
      expect(res).to.have.status(400);
      expect(res.error.text.toLowerCase()).to.contain('invalid').and.to.contain('request');
    };

    chai.request(app)
      .post('/api/users/')
      .then(_expectInvalidPayload)
      .then(function () {
        return chai.request(app)
          .post('/api/users/')
          .send({
            invalidPayload: {}
          });
      })
      .then(_expectInvalidPayload)
      .then(function () {
        return chai.request(app)
          .post('/api/users/')
          .send({
            user: {}
          });
      })
      .then(_expectInvalidRequest)
      .then(function () {
        return chai.request(app)
          .post('/api/users/')
          .send({
            user: {
              name: {
                first: 'Test'
              },
              email: 'test@test.com'
            }
          });
      })
      .then(_expectInvalidRequest)
      .then(function () {
        return chai.request(app)
          .post('/api/users/')
          .send({
            user: {
              name: {
                first: 'Test',
                last:  'Mocha'
              }
            }
          });
      })
      .then(_expectInvalidRequest)
      .then(done);
  });

  it('should create users', function ( done ) {
    chai.request(app)
      .post('/api/users/')
      .send({
        user: {
          name: {
            first: 'Mocha',
            last:  'Latte'
          },
          email: 'test@test.com'
        }
      })
      .then(function ( res ) {
        var __user = res.body.user;

        expect(res).to.have.status(201);
        expect(__user).to.exist.and.to.have.property('name');
        expect(__user).to.have.property('email');

        done();
      });
  });

  it('should reject duplicate emails', function ( done ) {
    var userInfo = {
      name: {
        first: 'Mocha',
        last:  'Latte'
      },
      email: 'test@test.js'
    };

    var user = new User(userInfo);

    user.save(function ( err, savedUser ) {
      if ( err ) throw err;

      chai.request(app)
        .post('/api/users/')
        .send({
          user: userInfo
        })
        .then(function ( res ) {
          expect(res).to.have.status(400);
          expect(res.error.text.toLowerCase()).to.contain('exists');

          done();
        });
    });
  });
});
