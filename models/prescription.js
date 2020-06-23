const mongoose = require('mongoose');


const Schema = mongoose.Schema;

// Schema do zapisu recept
const prescriptionSchema = new Schema({
  prescriptionName: {
    type: String,
    trim: true,
    required: 'Podaj nazwę recepty.',
  },
  amount: {
    type: String,
    trim: true,
    required: 'Podaj dawkę',
  },
  dateprescribed: {
    type: String,
    trim: true,
  },
  doctorprescribed: {
    type: String,
    trim: true,
    required: 'Lekarz wystawiający',
  },
  generalinstructions: {
    type: String,
    trim: true,
  },
});

// model mongoose
const Prescription = mongoose.model('Recepty', prescriptionSchema);

module.exports = Prescription;
