var winston   = require('winston').loggers.get('default'),
    chalk     = require('chalk'),
    normalize = require('../config/data-normalization'),
    respond   = require('./response'),
    _         = require('lodash');

var User          = require(process.cwd() + '/models/user'),
    ObjectId      = require('mongoose').Types.ObjectId,
    ResourceMixin = require('../lib/mixins/resource-handler');

exports.findById = ResourceMixin.getById('User', null, { useUserDomain: true, userDomain: '_id' });

exports.create = function ( req, res, next ) {
  var payload = req.body.user;

  if ( !payload ) {
    return res.status(400).send('Invalid payload');
  }

  if ( !payload.name || !payload.name || !payload.name.first || !payload.name.last || !payload.email ) {
    return res.status(400).send('Invalid request');
  }

  User.findOne({ email: payload.email }, function ( err, existingUser ) {
    if ( err ) {
      return respond.error.res(res, err, true);
    }

    if ( existingUser ) {
      return res.status(400).send('User already exists with that email');
    }

    var user = new User(payload);

    user.save(function ( err, savedUser ) {
      if ( err ) {
        return respond.error.res(res, err, true);
      }

      res.status(201).send({
        user: savedUser.toObject()
      });
    });
  });
};

exports.update = function ( req, res, next ) {

};

exports.remove = function ( req, res, next ) {

};
