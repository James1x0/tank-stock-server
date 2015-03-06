/*
  User Model
*/

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var createModel = require('./helpers/create-model');

var userSchema = new Schema({
  name: {
    first: String,
    last:  String
  },

  email: String,

  systems: [{ type: Schema.Types.ObjectId, ref: 'System' }],

  time_stamp: { type: Date, default: Date.now }
});

module.exports = createModel('User', userSchema);
