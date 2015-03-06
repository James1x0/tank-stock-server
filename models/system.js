/*
  System [ Aquarium ] Model
*/

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var createModel = require('./helpers/create-model');

var systemSchema = new Schema({
  name:        String,
  description: String,
  volume:      Number,
  marine:      Boolean,

  // Relational
  readings:  [{ type: Mongoose.Schema.ObjectId, ref: 'Reading' }],
  livestock: [{ type: Mongoose.Schema.ObjectId, ref: 'Livestock' }],
  notes:     [{ type: Mongoose.Schema.ObjectId, ref: 'Note' }],
  user:      { type: Mongoose.Schema.ObjectId, ref: 'User' },

  time_stamp: { type: Date, default: Date.now, index: true }
});

module.exports = createModel('System', systemSchema);
