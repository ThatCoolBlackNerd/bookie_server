const express = require('express');
const service = require('../db/bookie_service');
const router = express.Router();
const validate = require('../middleware/validate');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    let { email, password } = req.body;

    // Make request to database with client provided user information
    let user = await service.findUser(email);
    if(!user) return res.status(401).send('Email or password is not correct');

    // Validate password 
    const validatedPassword = await bcrypt.compare(password, user.password);
    if (!validatedPassword) return res.status(401).send('Email or password is not correct');
    
    // Generate Token
    const token = jwt.sign({id: user.id}, config.get('secretKey'));

    // Send token back to client
    res.status(200).send(token);    
});

module.exports = router;
