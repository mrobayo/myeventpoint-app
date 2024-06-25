import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { TopicType } from '@/types';
import { fetchData } from '@/services/fetch-utils';
import {HTTP_201_CREATED} from "@/mocks/mocks.utils";

const topicsService = {
  getAll: async () => {
    const response = await fetchData('/topics');
    if (!response.ok) {
      throw new Error('Fail retrying topics');
    }
    return response.json();
  },
  // deleteTopic: async (id: TopicType['id']) => {
  //   // send api update request here
  //   console.log('id', id);
  //   await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
  //   return Promise.resolve();
  // },
  async create(body: TopicType): Promise<TopicType> {
    const response = await fetchData('/topics', {
      body: JSON.stringify(body);
    });
    if (response.status !== HTTP_201_CREATED) throw new Error("error");
  },

  async update(id: string, body: TopicType): Promise<TopicType> {
    //return await this.service.put(`/${id}`, body);
  },

  async delete(id: TopicType): Promise<string> {
    //return await this.service.delete(`/${id}`);
  },
  async remove(id: any) {
    return http.delete<any>(`/tutorials/${id}`);
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
    mutationFn: topicsService.deleteTopic,
    //client side optimistic update
    onMutate: (topicId: string) => {
      queryClient.setQueryData(['users'], (prevUsers: any) =>
        prevUsers?.filter((row: TopicType) => row.id !== topicId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

export function useCreateTopic() {
  return useMutation({
    mutationFn: async (topic: TopicType) => {
      console.log('** Topic', topic);
      //send api request here
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      }); //fake api call
      return Promise.resolve();
    },
  });
}
