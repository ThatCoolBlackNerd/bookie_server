const express = require('express');
const service = require('../db/bookie_service');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    service.getWagers().then(wagers => {
        res.json(wagers)
    });
});

module.exports = router; 

