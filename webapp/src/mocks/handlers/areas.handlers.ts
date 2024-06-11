import { http, HttpResponse as response } from 'msw';
import { mockHost } from '@/mocks/mocks.utils';

export const areasHandlers = [
  http.get(`${mockHost}/areas`, () =>
     response.json({
       results: [
         { id: 1, name: 'RX', disabled: true },
         { id: 2, name: 'TAC', disabled: false },
         { id: 4, name: 'Eco', disabled: false },
       ],
       meta: {},
     })
  ),
];
