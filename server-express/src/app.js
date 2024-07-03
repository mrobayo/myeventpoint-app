const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const topicsRouter = require('./routes/topics/topics.router');
const worldCitiesRouter = require('./routes/world-cities/world-cities.router');
const eventsRouter = require('./routes/events/events.router');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../webapp-mantine/dist')))

app.use(morgan('short'));
app.use(topicsRouter);
app.use(worldCitiesRouter);
app.use('/events', eventsRouter);

// Fallback response
app.get('/*', (request, response) => {
  response.redirect('/');
});

module.exports = app;
