const express = require('express');
const { httpGetEvents, httpGetEvent, httpAddNewEvent, httpDeleteEvent } = require('./events.controller');

const eventsRouter = express.Router();
eventsRouter.get('/', httpGetEvents);
eventsRouter.get('/:id', httpGetEvent);
eventsRouter.delete('/:id', httpDeleteEvent);
eventsRouter.post('/', httpAddNewEvent);

module.exports = eventsRouter;
