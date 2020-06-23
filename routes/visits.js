const auth = require('../middleware/auth');
const { Visit } = require('../models/visit');
const { Patient } = require('../models/patient');
const { Doctor } = require('../models/doctor');
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const visit = await Visit.findById(req.params.id);
  res.send(visit);
});

router.get('/', auth, async (req, res) => {
  const { option } = req.query;
  let visits;
  let patient;
  switch (option) {
    case 'patientForDoctors':
      const { _id } = req.query;
      patient = await Patient.findById(_id);
      if (!patient) return res.status(400).send('Invalid patient');
      visits = await Visit.find({ 'patient._id': patient._id }).sort({
        date: -1,
      });
      res.send(visits);
      break;
    case 'patientForSelectedDoctors':
      if (!req.user.isDoctor) return res.status(403).send('Access denied.');
      visits = await Visit.find({ 'doctor._id': req.user._id }).sort({
        date: -1,
      });
      res.send(visits);
      break;
    case 'patientForPatient':
      patient = await Patient.findById(req.user._id);
      if (!patient) return res.status(400).send('Invalid patient');
      visits = await Visit.find({ 'patient._id': patient._id }).sort({
        date: -1,
      });
      res.send(visits);
      break;
    case 'all':
      visits = await Visit.find().sort({ date: -1 });
      res.send(visits);
      break;
  }
});

router.post('/', auth, async (req, res) => {
  const patient = await Patient.findById(req.user._id);
  if (!patient) return res.status(400).send('Invalid patient');

  const doctor = await Doctor.findById(req.body.doctor);
  if (!doctor) return res.status(400).send('Invalid doctor');

  const date = new Date();
  const day = req.body.date.split('/');
  const time = req.body.time.split(':');
  date.setFullYear(day[2]);
  date.setMonth(day[1]);
  date.setDate(day[0]);
  date.setHours(time[0]);
  date.setMinutes(time[1]);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const doctorVisit = await Visit.find({
    'doctor._id': doctor._id,
    date,
  });

  if (doctorVisit.length > 0) return res.status(400).send('Date not available');

  let visit = new Visit({
    reason: req.body.reason,
    date,
    patient: {
      _id: patient._id,
      firstname: patient.firstname,
      lastname: patient.lastname,
    },
    doctor: {
      _id: doctor._id,
      firstname: doctor.firstname,
      lastname: doctor.lastname,
    },
  });

  try {
    let response = await visit.save();
    res.send(response);
  } catch (ex) {
    res.status(500).send('Something failed');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const visit = await Visit.findByIdAndRemove(req.params.id);
    if (!visit)
      return res
        .status(404)
        .send('The visit was not found  \n I cannot delete it');
    res.send(visit);
  } catch (err) {
    return res
      .status(404)
      .send('The visit was not found  \n I cannot delete it  Not correct ID');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const visit = await Visit.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
      },
      { new: true }
    );
    if (!visit) return res.status(404).send('The visit was not found 😲');
    res.send(visit);
  } catch (err) {
    return res.status(404).send('The visit was not found 😲 Incorrect ID');
  }
});

module.exports = router;
