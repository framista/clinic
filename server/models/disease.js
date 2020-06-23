const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    }
});

const Disease = mongoose.model('Disease', diseaseSchema);

exports.Disease = Disease; 