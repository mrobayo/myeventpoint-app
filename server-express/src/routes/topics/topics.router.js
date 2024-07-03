const express = require('express');
const {
  httpGetAllTopics,
  httpGetTopic,
  httpAddNewTopic,
  httpDeleteTopic,
  httpUpdateTopic,
} = require('./topics.controller');

const topicsRouter = express.Router();
topicsRouter.get('/topics', httpGetAllTopics);
topicsRouter.post('/topics', httpAddNewTopic);
topicsRouter.get('/topics/:id', httpGetTopic);
topicsRouter.delete('/topics/:id', httpDeleteTopic);
topicsRouter.put('/topics/:id', httpUpdateTopic);

module.exports = topicsRouter;
