const auth = require('../middleware/auth')
const { Patient } = require('../models/patient')
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');

router.get('/me', auth, async (req, res) => {
    const patient = await Patient.findById(req.user._id).select('-password');
    res.send(patient);
});

router.get('/:id', async (req, res) => {
    const patient = await Patient.findById(req.params.id).select('-password');
    res.send(patient);
})

router.get('/', async (req, res) => {
    const patients = await Patient.find().sort({lastname:1, firstname: 1});
    res.send(patients.map(patient => _.pick(patient, ['_id', 'firstname','lastname', 'email', 'phone'])));
})

router.post('/', async (req, res) => {
    let patient = await Patient.findOne({ email: req.body.email });
    if (patient) return res.status(400).send('Patient already registered.');
    patient = new Patient(_.pick(req.body, ['firstname', 'lastname', 'email', 'password', 'phone']));
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(patient.password, salt);
    await patient.save();
    const token = patient.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(patient, ['_id', 'firstname', 'lastname', 'email']));
});

module.exports = router; 
