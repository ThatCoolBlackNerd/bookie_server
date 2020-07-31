const express = require('express');
const service = require('../db/bookie_service');
const router = express.Router();
const validate = require('../middleware/validate');
const config = require('config');
const _ = require('lodash');

router.post('/', async (req, res) => {
    // Destructuring the request body
    const { name, email, password } = req.body;

    // validate the user info from client
    const { error } = validate.validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // See if user with this email already exist
    let user = await service.findUser(req.body.email);
    if (user) return res.status(400).send('User with this email');

    // Create a new user
    let newUser = await service.registerUser(name, email, password);

    // Generate Token
    const token = jwt.sign({id: newUser.id}, config.get('secretKey'));

    // Send the new user object back to the client with selected properties
    res.header('x-auth-token', token).send(_.pick(newUser, ['id', 'name', 'email']));
     
});

module.exports = router;