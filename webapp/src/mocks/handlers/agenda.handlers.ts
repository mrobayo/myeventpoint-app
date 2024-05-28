import { http, HttpResponse } from 'msw';

const mockHost = import.meta.env.VITE_MOCK_HOST;

export const agendaHandlers = [
  http.get(`${mockHost}/user`, () =>
     HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  ),
  http.get(`${mockHost}/agenda/customer/:id`, () =>
    HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  ),
  http.post(`${mockHost}/agenda/customer/:id`, () =>
    HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  ),
];
