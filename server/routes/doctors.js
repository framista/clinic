const doctor = require('../middleware/doctor');
const auth = require('../middleware/auth');
const { Doctor } = require('../models/doctor');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');

router.get('/:id', async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.send(doctor);
});

router.get('/me', auth, doctor, async (req, res) => {
  const patient = await Patient.findById(req.user._id).select('-password');
  res.send(patient);
});

router.get('/', async (req, res) => {
  const doctors = await Doctor.find().sort({ lastname: 1, firstname: 1 });
  res.send(doctors);
});

router.post('/', async (req, res) => {
  let doctor = await Doctor.findOne({ email: req.body.email });
  if (doctor) return res.status(400).send('Doctor already registered');
  doctor = new Doctor(
    _.pick(req.body, [
      'firstname',
      'lastname',
      'email',
      'password',
      'picture',
      'isDoctor',
    ])
  );
  const salt = await bcrypt.genSalt(10);
  doctor.password = await bcrypt.hash(doctor.password, salt);
  await doctor.save();
  const token = doctor.generateAuthToken();
  console.log(token);
  res
    .header('x-auth-token', token)
    .send(
      _.pick(doctor, [
        '_id',
        'firstname',
        'lastname',
        'email',
        'isDoctor',
        'picture',
      ])
    );
});

module.exports = router;
