const express = require('express');
const { getEvents } = require('./events.controller');

const eventsRouter = express.Router();
eventsRouter.get('/events', getEvents);

module.exports = eventsRouter;
