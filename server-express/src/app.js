const express = require('express');
const cors = require('cors');

const topicsRouter = require('./routes/topics/topics.router');
const worldCitiesRouter = require('./routes/world-cities/world-cities.router');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(topicsRouter);
app.use(worldCitiesRouter);

module.exports = app;
