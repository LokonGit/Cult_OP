const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', routes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;