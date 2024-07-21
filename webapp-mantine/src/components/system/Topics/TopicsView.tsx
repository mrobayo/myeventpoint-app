import React, { useEffect, useState } from 'react';

import { useDisclosure } from '@mantine/hooks';
import { Button, Flex, Group, Input, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconDownload, IconPlus, IconSearch } from '@tabler/icons-react';

import { notifications } from '@mantine/notifications';
import { useDebounce } from '@/common/hooks/useDebounce';
import { useTopicQueries } from '@/services/topics-service';
import { NewTopicType, TopicKey, TopicType } from '@/types';

import { EditTopic } from './EditTopic';
import { TopicsList } from './TopicsList';

export function TopicsView() {
  const [opened, { close, open }] = useDisclosure(false);
  const [currentId, setCurrentId] = useState<TopicKey>();

  const [textSearch, setTextSearch] = useState('');
  const [filteredData, setFilteredData] = useState<TopicType[]>();

  const debouncedSearch = useDebounce<string>(textSearch, 300);

  const {
    data,
    isLoading,
    save,
    update,
    remove,
    isDeleting,
  } = useTopicQueries();

  const openDeleteModal = (row: TopicType) =>
    modals.openConfirmModal({
      title: 'Delete?',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete? This action is destructive.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await remove(row.id);
      },
    });

  const openUpdateModal = (row: TopicType) => {
    setCurrentId(row.id);
    open();
  };

  useEffect(() => {
    if (!debouncedSearch) setFilteredData(data);
    setFilteredData(data?.filter(row => row.name.indexOf(debouncedSearch ?? '') !== -1));
  }, [data, debouncedSearch, setFilteredData]);

  const onSubmit = async (values: Record<string, any>, id?: TopicKey) => {
    try {
      if (id) {
        await update(values as TopicType);
      } else {
        await save(values as NewTopicType);
      }
    } catch (error) {
      notifications.show({ color: 'red', message: `${error}` });
    }
    close();
  };

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
          <Button
            onClick={() => {
              setCurrentId(undefined);
              open();
            }}
            leftSection={<IconPlus size={14} />}>Add
          </Button>
          <Button variant="outline" rightSection={<IconDownload size={14} />}>Export</Button>
        </Group>
      </Flex>

      { isLoading && (<div>Loading</div>)}
      { !isLoading && (
        <TopicsList
          data={filteredData}
          deleteRow={openDeleteModal}
          updateRow={openUpdateModal}
          isDeleting={isDeleting}
        />
      )}
      <EditTopic currentId={currentId} opened={opened} close={close} onSubmit={onSubmit} />
    </>
  );
}
