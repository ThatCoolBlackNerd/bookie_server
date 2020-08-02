const express = require('express');
const service = require('../db/bookie_service');
const router = express.Router();

router.get('/', (req, res) => {
    let users = await service.getUsers();

    res.send(users)
})

router.get('/:userId', async (req, res) => {
    let id = req.params.userId

    let user = await service.getUserById(id);
    if(!user) return res.status(401).send('Invalid User');

    res.send(user);
});

module.exports = router; 
