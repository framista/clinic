const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const authDoctor = require('./routes/authDoctor');
const patients = require('./routes/patients');
const doctors = require('./routes/doctors');
const medicines = require('./routes/medicines');
const allergies = require('./routes/allergies');
const diseases = require('./routes/diseases');
const surveys = require('./routes/surveys');
const visits = require('./routes/visits');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use('/api/patients', patients);
app.use('/api/doctors', doctors);
app.use('/api/medicines', medicines);
app.use('/api/allergies', allergies);
app.use('/api/diseases', diseases);
app.use('/api/surveys', surveys);
app.use('/api/visits', visits);
app.use('/api/auth', auth);
app.use('/api/authDoctor', authDoctor);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
