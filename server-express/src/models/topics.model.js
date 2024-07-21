/**
 * Topics is global category for everything
 * Props:
 *   name: topic name (unique)
 *   disabled: visible but not able to select.
 *   children: a list of sub topics (optional)
 */

let lastTopicId = 1;
const topicsMap = new Map();

const topicsSample = [
  {
    name: 'Car rental',
    disabled: false,
  },
  {
    name: 'Cargo Services',
    disabled: false,
  },
  {
    name: 'Retail stocks',
    disabled: false,
  },
  {
    name: 'Accommodation',
    disabled: false,
    children: [ 'Hotel', 'Apartment', 'Resort', 'Campsite', 'Hostel', 'Motel', 'Guest house', 'Bed and breakfast', 'Boutique hotel', 'Chalet'  ],
  },
];

topicsSample.forEach(topic => addNewTopic(topic));

function getTopics() {
  return [...topicsMap.values()];
}

function getTopic(topicId) {
  return topicsMap.get(topicId);
}

function addNewTopic(topic) {
  const id = lastTopicId++;
  topicsMap.set(id, Object.assign(topic, { id }));
  return getTopic(id);
}

function existsTopicById(topicId) {
  return topicsMap.has(topicId);
}

function existsTopic(topic, currentId) {
  return [...topicsMap.values()].some(({ id, name }) => name === topic.name && id !== currentId);
}

function deleteTopic(topicId) {
  topicsMap.delete(topicId);
}

function updateTopic(topicId, topic) {
  const oldTopic = topicsMap.get(topicId);
  const { name, disabled } = topic;
  topicsMap.set(topicId, Object.assign(topic, Object.assign(oldTopic, { name, disabled })));
}

module.exports = {
  getTopics,
  getTopic,
  existsTopicById,
  existsTopic,
  addNewTopic,
  deleteTopic,
  updateTopic,
  topics: getTopics(),
}