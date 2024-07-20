import React, { useEffect, useState } from 'react';

import { Button, Flex, Group, Input, Text } from '@mantine/core';
 import { modals } from '@mantine/modals';

import { IconDownload, IconPlus, IconSearch } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

import { useDisclosure } from '@mantine/hooks';
import { useDebounce } from '@/common/hooks/useDebounce';
import {useCreateTopic, useDeleteTopic, useGetTopics} from '@/services/topics-service';
import { TopicKey, TopicType } from '@/types';

import { EditTopic } from './EditTopic';
import { TopicsList } from './TopicsList';

export function TopicsView() {
  const [opened, { close, open }] = useDisclosure(false);
  const [currentId, setCurrentId] = useState<TopicKey>(null);

  const [textSearch, setTextSearch] = useState('');
  const [filteredData, setFilteredData] = useState<TopicType[]>();

  const queryClient = useQueryClient();
  const { data, isPending: isLoading } = useGetTopics();
  const debouncedSearch = useDebounce<string>(textSearch, 300);

  // call DELETE hook
  const { mutateAsync: saveRow, isPending: isSaving} = useCreateTopic();
  const { mutateAsync: deleteRow, isPending: isDeleting } = useDeleteTopic();

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
        await deleteRow(row.id);
        await queryClient.invalidateQueries({ queryKey: ['topics'] });
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

  const onSubmit = async (newValues: Record<string, any>) => {
    //const newObject: TopicType = { id: -1, ...newValues };
    //await createNew(newObject);
    saveRow(newValues as TopicType);
    console.log('newValues **', newValues);
    //onSaved?.(); // trigger refresh
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
              setCurrentId(null);
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
