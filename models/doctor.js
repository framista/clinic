const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const doctorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    equired: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isDoctor: {
    type: Boolean,
    default: true,
  },
});

doctorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isDoctor: this.isDoctor },
    config.get('jwtPrivateKey')
  );
  return token;
};

const Doctor = mongoose.model('Doctor', doctorSchema);

exports.Doctor = Doctor;
