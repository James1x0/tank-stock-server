/*
  Livestock Model
*/

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var createModel = require('./helpers/create-model');

var livestockSchema = new Schema({
  name:   String,
  length: Number,

  // Relational
  system:  { type: Mongoose.Schema.ObjectId, ref: 'System' },
  owner:   { type: Mongoose.Schema.ObjectId, ref: 'User' },
  species: [{ type: Mongoose.Schema.ObjectId, ref: 'Species' }],
  notes:   [{ type: Mongoose.Schema.ObjectId, ref: 'Note' }],

  time_stamp: { type: Date, default: Date.now, index: true }
});

module.exports = createModel('Livestock', livestockSchema);
