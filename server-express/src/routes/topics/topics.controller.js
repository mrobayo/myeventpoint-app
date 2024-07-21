const { isEmpty, isNil, trim } = require('ramda');
const {
  getTopics,
  getTopic,
  existsTopicById,
  existsTopic,
  addNewTopic,
  deleteTopic,
  updateTopic
} = require('../../models/topics.model');

function httpGetAllTopics(request, response) {
  return response.status(200).json(getTopics());
}

function httpGetTopic(request, response) {
  const id = parseInt(request.params.id, 10);
  if (existsTopicById(id)) {
    return response.status(200).json(getTopic(id));
  }
  return response.status(404).json({ error: `Not found` });
}

function httpDeleteTopic(request, response) {
  const id = parseInt(request.params.id, 10);
  if (existsTopicById(id)) {
    deleteTopic(id);
  }
  return response.sendStatus(204);
}

function httpUpdateTopic(request, response) {
  const id = parseInt(request.params.id, 10);
  if (existsTopic(request.body, id)) {
    return response.status(404).json({ error: 'Name is duplicated' });
  }
  if (existsTopicById(id)) {
    updateTopic(id, request.body);
    return response.sendStatus(204);
  }
  return response.status(404).json({ error: 'Not found' });
}

function httpAddNewTopic(request, response) {
  const data = request.body;
  const newData = { name: trim(data.name || ''), disabled: !!data.disabled, createDate: new Date() };

  const { name } = newData;
  if (isEmpty(name) || isNil(name)) {
    return response.status(400).json({error: ' Name is required'})
  }
  if (existsTopic(newData)) {
    return response.status(404).json({ error: 'Name is duplicated' });
  }
  addNewTopic(newData);
  return response.status(201).json(data);
}

module.exports = {
  httpGetAllTopics,
  httpGetTopic,
  httpAddNewTopic,
  httpDeleteTopic,
  httpUpdateTopic,
}