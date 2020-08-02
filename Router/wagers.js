const express = require('express');
const service = require('../db/bookie_service');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    let wagers = await service.getWagers();

    res.send(wagers);
});

module.exports = router; 

