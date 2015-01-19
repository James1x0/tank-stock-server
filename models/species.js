/*
  Species Model
*/

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var createModel = require('./helpers/create-model');

var speciesSchema = new Schema({
  name:   String,
  length: Number,
  marine: Boolean,

  parameters: {
    ph: {
      min: Number,
      max: Number
    },
    salinity: {
      min: Number,
      max: Number
    }
  },

  time_stamp: { type: Date, default: Date.now, index: true }
});

module.exports = createModel('Species', speciesSchema);
