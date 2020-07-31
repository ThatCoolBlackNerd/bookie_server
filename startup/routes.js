const express = require('express');
const error = require('../middleware/error');
const cors = require('cors');
const auth = require('../Router/auth');
const register = require('../Router/register');
const users = require('../Router/users');
const wager = require('../Router/wager');
const wagers = require('../Router/wagers');
const helmet = require('helmet');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(express.json());
    app.use(error);
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/login', auth);
    app.use('/register', register);
    app.use('/api/users', users);
    app.use('/api/wager', wager);
    app.use('/api/wagers', wagers);

}