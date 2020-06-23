const { Medicine } = require('../models/medicine')
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/:id', async (req, res) => {
    const medicine = await Medicine.findById(req.params.id);
    res.send(medicine);
})

router.get('/', async (req, res) => {
    const medicines = await Medicine.find().sort({ name: 1 });
    res.send(medicines);
})

router.post('/', async (req, res) => {
    const medicine = new Medicine({
        name: req.body.name
    });
    try {
        let response = await medicine.save();
        res.send(response);
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router; 
