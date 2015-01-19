var winston   = require('winston').loggers.get('default'),
    chalk     = require('chalk'),
    normalize = require('../config/data-normalization'),
    respond   = require('./response'),
    _         = require('lodash');

var ObjectId       = require('mongoose').Types.ObjectId,
    ResourceMixin  = require('../lib/mixins/resource-handler');

exports.fetchAll  = ResourceMixin.getAll('System', null, { useUserDomain: true, userDomain: 'owner' });
exports.fetchByID = ResourceMixin.getById('System', null, { useUserDomain: true, userDomain: 'owner' });
