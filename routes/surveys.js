const auth = require('../middleware/auth');
const { Survey } = require('../models/survey');
const { Patient } = require('../models/patient');
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const survey = await Survey.findById(req.params.id);
  res.send(survey);
});

router.get('/', async (req, res) => {
  const { id } = req.query;
  const patient = await Patient.findById(id);
  if (!patient) return res.status(400).send('Invalid patient');

  const surveys = await Survey.find({ 'patient._id': patient._id }).sort({
    date: -1,
  });
  res.send(surveys);
});

router.post('/', auth, async (req, res) => {
  const patient = await Patient.findById(req.user._id);
  if (!patient) return res.status(400).send('Invalid patient');

  let survey = new Survey({
    chronicDiseases: req.body.chronicDiseases,
    medicines: req.body.medicines,
    allergies: req.body.allergies,
    symptoms: req.body.symptoms,
    systems: req.body.systems,
    patient: {
      _id: patient._id,
      firstname: patient.firstname,
      lastname: patient.lastname,
    },
  });

  try {
    let response = await survey.save();
    res.send(response);
  } catch (ex) {
    res.status(500).send('Something failed');
  }
});

module.exports = router;
