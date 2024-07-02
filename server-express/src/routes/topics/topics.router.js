const express = require('express');
const { getAllTopics } = require('./topics.controller');

const topicsRouter = express.Router();
topicsRouter.get('/topics', getAllTopics);

module.exports = topicsRouter;
