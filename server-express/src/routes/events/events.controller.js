const { events } = require('../../models/events.model');

function getEvents(request, response) {
  console.log('get-events', events.size);
  return response.status(200).json([...events]);
}

module.exports = {
  getEvents,
}