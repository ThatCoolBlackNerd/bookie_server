const express = require('express');
const app = express()

// Require files for startup 
require('dotenv').config();
require('../startup/logging')(app);
require('../startup/routes')(app);

module.exports = app