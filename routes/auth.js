// const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { Patient } = require('../models/patient');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

    let patient = await Patient.findOne({ email: req.body.email });
    if (!patient) return res.status(400).send('Invalid email or password.');
    const validPassword = await bcrypt.compare(req.body.password, patient.password)    
    if( !validPassword) return res.status(400).send('Invalid email or password.');
    const token = patient.generateAuthToken();
    res.send(token);
});

module.exports = router; 