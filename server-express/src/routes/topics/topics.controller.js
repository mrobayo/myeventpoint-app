const {
  getTopics,
  getTopic,
  existsTopicById,
  addNewTopic,
  deleteTopic,
  updateTopic
} = require('../../models/topics.model');

function httpGetAllTopics(request, response) {
  return response.status(200).json(getTopics);
}

function httpGetTopic(request, response) {
  const id = parseInt(request.params.id, 10);
  if (existsTopicById(id)) {
    return response.status(200).json(getTopic(id));
  }
  return response.status(404).json({ error: `Not found` });
}

function httpDeleteTopic(request, response) {
  const id = parseInt(request.params.id, 100);
  if (existsTopicById(id)) {
    deleteTopic(id);
  }
  return response.status(204);
}

function httpUpdateTopic(request, response) {
  const id = parseInt(request.params.id, 100);
  if (existsTopicById(id)) {
    updateTopic(id, response.body);
    return response.status(204);
  }
  return response.status(404).json({ error: 'Not found' });
}

function httpAddNewTopic(request, response) {
  const data = request.body;
  data.createDate = new Date();

  addNewTopic(data);
  return response.status(201).json(data);
}


module.exports = {
  httpGetAllTopics,
  httpGetTopic,
  httpAddNewTopic,
  httpDeleteTopic,
  httpUpdateTopic,
}