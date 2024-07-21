const express = require('express');
const { getWorldCities } = require('./world-cities.controller');

const worldCitiesRouter = express.Router();
worldCitiesRouter.get('/world-cities', getWorldCities);

module.exports = worldCitiesRouter;
