import { useQuery } from '@tanstack/react-query';
import { TopicType } from '@/types';
import { fetchData } from '@/services/fetch-utils';

const topicsService = {
  getAll: async () => {
    const response = await fetchData('/topics');
    if (!response.ok) {
      throw new Error('Fail retrying topics');
    }
    return response.json();
  },
};

export function useGetTopics() {
  return useQuery<TopicType[]>({
    queryKey: ['topics'],
    queryFn: topicsService.getAll,
    refetchOnWindowFocus: false,
  });
}
