import { useEffect } from 'react';
import { useGetTopics } from '@/services/topics-service';

export function TopicsList() {
  const { data } = useGetTopics();
  useEffect(() => {
    console.log('DAT', data);
  }, [data]);

  return (
    <div>
      {data?.map(topic =>
        <span key={topic.id}>{topic.name}</span>
      )}
    </div>
  );
}
