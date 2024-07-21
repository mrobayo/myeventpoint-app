import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NewTopicType, TopicKey, TopicType } from '@/types';
import { fetchData } from '@/services/fetch-utils';

export const topicsService = {
  getById: async (id: TopicKey): Promise<TopicType> => {
    const response = await fetchData(`/topics/${id}`);
    if (!response.ok) {
      throw new Error('Fail retrying topic');
    }
    return response.json() as TopicType;
  },
  getAll: async () => {
    const response = await fetchData('/topics');
    if (!response.ok) {
      throw new Error('Fail retrying topics');
    }
    return response.json() as TopicType[];
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
  async create(body: NewTopicType): Promise<any> {
    const response = await fetchData('/topics', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    return response;
  },
  async update(body: TopicType): Promise<any> {
    const { id } = body;
    const response = await fetchData(`/topics/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    return response;
  },
};

export function useGetTopic(id: TopicKey | undefined) {
   return useQuery<TopicType, Error>({
    queryKey: ['topics', 'byId', id],
    queryFn: () => topicsService.getById(id!),
    staleTime: 30000,
    enabled: !!id,
  });
}

export function useTopicQueries() {
  const queryClient = useQueryClient();
  const invalidateQuery = () => queryClient.invalidateQueries({ queryKey: ['topics'] });

  const { data, isPending: isLoading } = useQuery<TopicType[]>({
    queryKey: ['topics'],
    queryFn: topicsService.getAll,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: remove, isPending: isDeleting } = useMutation({
    mutationFn: topicsService.delete,
    onSuccess: invalidateQuery,
  });
  const { mutateAsync: save } = useMutation({
    mutationFn: topicsService.create,
    onSuccess: invalidateQuery,
  });
  const { mutateAsync: update } = useMutation({
    mutationFn: topicsService.update,
    onSuccess: invalidateQuery,
  });

  return {
    data,
    isLoading,
    remove,
    isDeleting,
    save,
    update,
    invalidateQuery,
  };
}
