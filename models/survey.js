const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  chronicDiseases: [String],
  medicines: [String],
  allergies: [String],
  symptoms: {
    place: String,
    frequency: String,
    factor: String,
    grade: String,
    symptoms: String,
  },
  systems: [],
  patient: {
    type: new mongoose.Schema({
      firstname: { type: String },
      lastname: { type: String },
    }),
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Survey = mongoose.model('Survey', surveySchema);

exports.Survey = Survey;
