const express = require('express');
const service = require('../db/bookie_service');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

router.post('/', auth, async (req, res) => {
    let wager = req.body;

    // validate the wager info from client
    const { error } = validate.validateWager(wager);
    if (error) return res.status(400).send(error.details[0].message);

    let wager = await service.placeWager(wager);

    res.send(wager[0]);
});

router.get('/:id', auth, async (req, res) => {
    let id = req.params.id

    let wager = await service.getUserWager(id);
    if(!wager) return res.status(401).send('Invalid Wager');

    res.send(wager);
});

module.exports = router; 