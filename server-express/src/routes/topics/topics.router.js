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
topicsRouter.get('/topics/:id', httpGetTopic);

topicsRouter.post('/topics', httpAddNewTopic);

topicsRouter.delete('/topics/:id', httpDeleteTopic);
topicsRouter.put('/topics/:id', httpUpdateTopic);

module.exports = topicsRouter;
