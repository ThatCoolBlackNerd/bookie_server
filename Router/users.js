const express = require('express');
const service = require('../db/bookie_service');
const router = express.Router();

router.get('/', service.getUsers);

router.get('/:userId', (req, res, next) => {
    let id = req.params.userId

    service.getUserById(id).then(user => {
        if (!user) {
            return res.status(404).send('User does not exist')
        }
        res.json(user)
    })
    .catch(next)
});

module.exports = router; 
