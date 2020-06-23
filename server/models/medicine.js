const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    }
});

const Medicine = mongoose.model('Medicine', medicineSchema);

exports.Medicine = Medicine; 