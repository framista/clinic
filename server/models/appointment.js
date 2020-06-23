import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AppointmentSchema = new mongoose.Schema({
  cuid: { 
    type: 'String', 
    required: true 
  },
  reason: { 
    type: 
    'String', 
    required: true 
  },
  appointmentDate: { 
    type: 'Date', 
    default: Date.now, 
    required: true 
  },
  appointmentHour: { 
    type: 'string', 
    required: true 
},
  _ID: { 
    type: 'String', 
    required: true, 
    default: '5b6082a0bccc0d4aac848bea' 
  },
  
});

const Appointment = mongoose.model('Appointment', patientSchema);

exports.Patient = Patient; 