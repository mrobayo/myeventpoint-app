import { useState } from 'react';
import { ActionIcon, Checkbox, Table } from '@mantine/core';
import { IconEdit, IconX } from '@tabler/icons-react';

import { TopicType } from '@/types';

const {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
} = Table;

type TopicsListProps = {
  data?: TopicType[], updateRow: (row: TopicType) => void, deleteRow: (row: TopicType) => void, isDeleting: boolean,
};

export function TopicsList({ data, deleteRow, updateRow, isDeleting }: TopicsListProps) {
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

  const toggleAll = () => {
    const ids = (data || []).map(({ id }) => id) as number[];
    setSelectedRows(
      prev => prev.length === ids.length ? [] : ids
    );
  };

  const rows = data?.map(row => (
    <Tr key={row.id}>
      <Td>
        <Checkbox
          checked={selectedRows.indexOf(row.id || -1) !== -1}
          onChange={() => row.id && toggleRow(row.id)}
        />
      </Td>
      <Td>
        <ActionIcon aria-label="Edit" variant="subtle" size="sm" onClick={() => updateRow(row)}>
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          aria-label="Delete"
          variant="subtle"
          size="sm"
          color="red"
          onClick={() => deleteRow(row)}
          disabled={isDeleting}
        >
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
