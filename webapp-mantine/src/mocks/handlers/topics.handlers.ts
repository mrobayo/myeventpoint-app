import { http, HttpResponse } from 'msw';
import { HTTP_201_CREATED, HTTP_204_NO_CONTENT, mockHost } from '@/mocks/mocks.utils';
import { sleep } from '@/common/utils/util-functions';

const topicsData = [
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
];

export const topicsHandlers = [
  http.get(`${mockHost}/topics`, async () => {
    // TODO remove it
    await sleep(2000);
    return HttpResponse.json(topicsData);
  }),
  http.post(`${mockHost}/topics`, async ({ request }) => {
    const newPost = await request.json();
    console.log('Captured a "POST " request', newPost);
    return HttpResponse.json(newPost, { status: 201 });

    // return new HttpResponse(null, { status: HTTP_201_CREATED });
  }),
  http.delete(`${mockHost}/topics/:id`, ({ params }) => {
    console.log(`Captured a "DELETE /topics/${params.id}" request`);
    return new HttpResponse(null, { status: HTTP_204_NO_CONTENT });
  }),
  http.put(`${mockHost}/topics/:id`, ({ params }) => {
    console.log(`Captured a "PUT /topics/${params.id}" request`);
    return new HttpResponse(null, { status: HTTP_204_NO_CONTENT });
  }),
];
