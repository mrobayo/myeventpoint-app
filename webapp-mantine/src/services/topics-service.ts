import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TopicKey, TopicType } from '@/types';
import { fetchData } from '@/services/fetch-utils';
import { HTTP_201_CREATED } from '@/mocks/mocks.utils';

const topicsService = {
  getAll: async () => {
    const response = await fetchData('/topics');
    if (!response.ok) {
      throw new Error('Fail retrying topics');
    }
    return response.json();
  },
  async delete(id: TopicKey): Promise<any> {
    const response = await fetchData(`/topics/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    if (response.status >= 400) {
      throw new Error(response);
    }
    return response;
  },
  async create(body: TopicType): Promise<any> {
    const response = await fetchData('/topics', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    if (response.status !== HTTP_201_CREATED) {
      throw new Error(response);
    }
    return response;
  },
  async update(id: TopicKey, body: TopicType): Promise<any> {
    const response = await fetchData(`/topics/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    if (response.status !== HTTP_201_CREATED) {
      throw new Error(response);
    }
    return response;
  },
};

export function useGetTopics() {
  return useQuery<TopicType[]>({
    queryKey: ['topics'],
    queryFn: topicsService.getAll,
    refetchOnWindowFocus: false,
  });
}

export function useDeleteTopic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: topicsService.delete,
    //client side optimistic update
    onMutate: (topicId: TopicKey) => {
      queryClient.setQueryData(['users'], (prevUsers: any) =>
        prevUsers?.filter((row: TopicType) => row.id !== topicId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

export function useCreateTopic() {
  return useMutation({
    mutationFn: topicsService.create,
    // mutationFn: async (topic: TopicType) => {
    //   console.log('** Topic', topic);
    //   //send api request here
    //   await new Promise((resolve) => {
    //     setTimeout(resolve, 1000);
    //   }); //fake api call
    //   return Promise.resolve();
    // },
  });
}
