const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  patient: {
    type: new mongoose.Schema({
      firstname: { type: String },
      lastname: { type: String },
    }),
    required: true,
  },
  doctor: {
    type: new mongoose.Schema({
      firstname: { type: String },
      lastname: { type: String },
    }),
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

const Visit = mongoose.model('Visit', visitSchema);

exports.Visit = Visit;
