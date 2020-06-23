// const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { Doctor } = require('../models/doctor');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  let doctor = await Doctor.findOne({ email: req.body.email });
  if (!doctor) return res.status(400).send('Invalid email or password.');
  const validPassword = await bcrypt.compare(
    req.body.password,
    doctor.password
  );
  if (!validPassword) return res.status(400).send('Invalid email or password.');
  const token = doctor.generateAuthToken();
  res.send(token);
});

module.exports = router;
