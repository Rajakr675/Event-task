const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./src/routes/auth');
const eventRoutes = require('./src/routes/events');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

module.exports = app;
