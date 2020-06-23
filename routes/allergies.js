const { Allergie } = require('../models/allergie')
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const allergie = await Allergie.findById(req.params.id);
    res.send(allergie);
})

router.get('/', async (req, res) => {
    const allergies = await Allergie.find().sort({ name: 1 });
    res.send(allergies);
})

router.post('/', async (req, res) => {
    const allergie = new Allergie({
        name: req.body.name
    });
    try {
        let response = await allergie.save();
        res.send(response);
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router; 
