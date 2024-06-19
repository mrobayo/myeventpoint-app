import { useEffect } from 'react';
import { Checkbox, Table } from '@mantine/core';
import { useGetTopics } from '@/services/topics-service';

const {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
} = Table;

export function TopicsList() {
  const { data } = useGetTopics();
  useEffect(() => {
    console.log('DAT', data);
  }, [data]);

  const rows = data?.map(topic => (
    <Tr key={topic.id}>
      <Td>
        <Checkbox defaultChecked />
      </Td>
      <Td>{topic.id}</Td>
      <Td>{topic.name}</Td>
      <Td></Td>
    </Tr>
  ));

  return (
      <Table striped>
        <Thead>
          <Tr>
            <Th><Checkbox /></Th>
            <Th>Id</Th>
            <Th>Topic</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
      </Table>

  );
}
