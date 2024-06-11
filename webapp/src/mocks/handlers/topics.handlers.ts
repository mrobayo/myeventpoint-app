import { http, HttpResponse } from 'msw';
import { mockHost } from '@/mocks/mocks.utils';

export const topicsHandlers = [
  http.get(`${mockHost}/topics`, () =>
     HttpResponse.json([
       {
          id: '1',
          name: 'Concierto',
          disabled: false,
        },
        {
          id: '2',
          name: 'Teatro',
          disabled: false,
        },
       ])
  ),
  ];
