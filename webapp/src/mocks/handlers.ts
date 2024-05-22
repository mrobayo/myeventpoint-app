import { http, HttpResponse } from 'msw';

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get(`${import.meta.env.VITE_MOCK_HOST}/user`, () =>
    // ...and respond to them using this JSON response.
     HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  ),
];
