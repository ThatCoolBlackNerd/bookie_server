const express = require('express');
const service = require('../db/bookie_service');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, (req, res, next) => {
    let wager = req.body;

    if(wager) {
        service.placeWager(wager).then(wager => {
            res.json(wager[0])
        })
        .catch(next)
    } else {
        res.status(404).send('wager not placed')
    }   
});

router.get('/:id', auth,  (req, res, next) => {
    let id = req.params.id

    service.getUserWager(id).then(wager => {
       res.json(wager)
    })
    .catch(next)
});

module.exports = router; 