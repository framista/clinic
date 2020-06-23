const mongoose = require('mongoose');

const allergieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Allergie = mongoose.model('Allergie', allergieSchema);

exports.Allergie = Allergie;
