const { getEvents, getEvent, addNewEvent, deleteEvent, existsEventById } = require('../../models/events.model');

function httpGetEvents(request, response) {
  return response.status(200).json(getEvents());
}

function httpGetEvent(request, response) {
  const eventId = parseInt(request.params.id, 10);
  if (!existsEventById(eventId)) {
    return response.status(404).json({ message: `Event not found` });
  }
  return response.status(200).json(getEvent(eventId));
}

function httpAddNewEvent(request, response) {
  const event = request.body;
  event.createDate = new Date();

  addNewEvent(event);
  return response.status(201).json(event);
}

function httpDeleteEvent(request, response) {
  const eventId = parseInt(request.params.id, 10);
  if (!existsEventById(eventId)) {
    return response.status(404).json({ message: 'Event not found' });
  }
  deleteEvent(eventId);
  return response.status(204);
}

module.exports = {
  httpGetEvents,
  httpGetEvent,
  httpAddNewEvent,
  httpDeleteEvent,
}