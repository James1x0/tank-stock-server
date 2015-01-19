/*
  Note Model
*/

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var createModel = require('./helpers/create-model');

var noteSchema = new Schema({
  title: String,
  text:  String,

  owner: { type: Mongoose.Schema.ObjectId, ref: 'User' },

  time_stamp: { type: Date, default: Date.now, index: true }
});

module.exports = createModel('Note', noteSchema);
