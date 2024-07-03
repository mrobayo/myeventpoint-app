const events = new Map();

const event = {
  id: 100,
  creator: 'Paulina Tamayo',
  summary: 'Concierto Buffet ',
  location: 'Teatro Agorá Casa Del La Cultura',
  description: 'Paulina Tamayo La grande del Ecuador, festeja a las madres con un show',
  start: {
    dateTime: '20245-05-28T09:00:00-07:00',
    timeZone: 'America/Los_Angeles'
  },
  end: {
    dateTime: '2024-05-28T17:00:00-07:00',
    timeZone: 'America/Los_Angeles'
  },
  recurrence: [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  attendees: [
    {email: 'lpage@example.com'},
    {email: 'sbrin@example.com'}
  ],
  reminders: {
    useDefault: false,
    overrides: [
      {method: 'email', minutes: 24 * 60},
      {method: 'popup', minutes: 10}
    ]
  }
};

events.set(event.id, event);

module.exports = {
  events,
};
