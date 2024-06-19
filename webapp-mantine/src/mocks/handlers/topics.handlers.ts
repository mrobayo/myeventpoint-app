import { http, HttpResponse } from 'msw';
import { mockHost } from '@/mocks/mocks.utils';

export const topicsHandlers = [
  http.get(`${mockHost}/topics`, () =>
     HttpResponse.json([
       {
          id: 1,
          name: 'National flights',
          disabled: false,
        },
        {
          id: 2,
          name: 'International flights',
          disabled: false,
        },
        {
          id: 3,
          name: 'Packages',
          disabled: false,
        },
        {
          id: 4,
          name: 'Cash service',
          disabled: false,
        },
       ])
  ),
  ];
