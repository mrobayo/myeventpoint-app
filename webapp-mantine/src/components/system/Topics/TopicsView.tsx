import { useEffect, useRef, useState } from 'react';

import { Button, Flex, Group, Input } from '@mantine/core';
import { IconDownload, IconPlus, IconSearch } from '@tabler/icons-react';

import { TopicsList } from './TopicsList';
import { useDeleteTopic, useGetTopics } from '@/services/topics-service';
import { TopicType } from '@/types';
import { useDebounce } from '@/common/hooks/useDebounce';

export function TopicsView() {
  const [textSearch, setTextSearch] = useState('');
  const [filteredData, setFilteredData] = useState<TopicType[]>();

  const { data } = useGetTopics();
  const debouncedSearch = useDebounce<string>(textSearch, 300);

  // call DELETE hook
  const { mutateAsync: deleteTopic, isPending: isDeletingTopic } = useDeleteTopic();

  const handleDeleteTopic = (row: TopicType) => {
    deleteTopic(row.id);
  };

  useEffect(() => {
    if (!debouncedSearch) setFilteredData(data);
    setFilteredData(data?.filter(row => row.name.indexOf(debouncedSearch ?? '') !== -1));
  }, [data, debouncedSearch, setFilteredData]);

  return (
    <>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm' }}
        justify={{ sm: 'space-between' }}
        style={{ paddingBottom: 'var(--mantine-spacing-md)' }}>
        <Input
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
          leftSection={<IconSearch size={16} />}
          placeholder="Search..."
          leftSectionPointerEvents="none"
        />
        <Group justify="right">
          <Button leftSection={<IconPlus size={14} />}>Add</Button>
          <Button variant="outline" rightSection={<IconDownload size={14} />}>Export</Button>
        </Group>
      </Flex>

      <TopicsList data={filteredData} />
    </>
  );
}
