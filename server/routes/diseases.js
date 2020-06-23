const { Disease } = require('../models/disease')
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const disease = await Disease.findById(req.params.id);
    res.send(disease);
})

router.get('/', async (req, res) => {
    const diseases = await Disease.find().sort({ name: 1 });
    res.send(diseases);
})

router.post('/', async (req, res) => {
    const disease = new Disease({
        name: req.body.name
    });
    try {
        let response = await disease.save();
        res.send(response);
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router; 
