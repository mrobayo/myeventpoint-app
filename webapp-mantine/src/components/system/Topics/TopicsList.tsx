import { useState } from 'react';
import { ActionIcon, Checkbox, Table } from '@mantine/core';
import { IconEdit, IconHeart, IconX } from '@tabler/icons-react';

import {TopicKey, TopicType} from '@/types';

const {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
} = Table;

export function TopicsList({ data, deleteRow, isDeleting }: { data?: TopicType[], deleteRow: (id: TopicType) => void, isDeleting: boolean }) {
  const [selectedRows, setSelectedRows] = useState(new Array<number>());

  const toggleRow = (id: number) => {
    setSelectedRows(prevState => {
      const exists = prevState.indexOf(id);
      if (exists !== -1) {
        return [...prevState.slice(0, exists), ...prevState.slice(exists + 1)];
      }
      return [...prevState, id];
    });
  };

  const toggleAll = () =>
    setSelectedRows(
      prev => prev.length === data?.length ? [] : [...data?.map(({ id }) => id)]
    );

  const rows = data?.map(row => (
    <Tr key={row.id}>
      <Td>
        <Checkbox
          checked={selectedRows.indexOf(row.id) !== -1}
          onChange={() => toggleRow(row.id)}
        />
      </Td>
      <Td>
        <ActionIcon aria-label="Edit" variant="subtle" size="sm">
          <IconEdit />
        </ActionIcon>
        <ActionIcon aria-label="Like" variant="subtle" size="sm">
          <IconHeart />
        </ActionIcon>
        <ActionIcon aria-label="Delete" variant="subtle" size="sm" color="red" onClick={() => deleteRow(row)} disabled={isDeleting}>
          <IconX />
        </ActionIcon>
      </Td>
      <Td>{row.id}</Td>
      <Td>{row.name}</Td>
    </Tr>
  ));

  return (
      <Table striped>
        <Thead>
          <Tr>
            <Th>
              <Checkbox
                variant="outline"
                disabled={data?.length === 0}
                indeterminate={selectedRows.length > 0 && selectedRows.length < (data?.length ?? 0)}
                checked={selectedRows.length === data?.length}
                onChange={toggleAll}
              />
            </Th>
            <Th />
            <Th>Id</Th>
            <Th>Topic</Th>
          </Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
      </Table>

  );
}
