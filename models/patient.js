const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstname: {
        type: String, 
        required: true 
    },
    lastname: {
        type: String, 
        required: true 
    },
    password: {
        type: String, 
        required: true 
    },
    email: {
        type: String, 
        required: true, 
        unique: true 
    },
    phone: Number,
});

patientSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const Patient = mongoose.model('Patient', patientSchema);

exports.Patient = Patient; 