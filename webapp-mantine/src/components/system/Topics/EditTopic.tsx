import React, { useEffect } from 'react';
import { Button, Group, Modal, Switch, Text, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { NewTopicType, TopicKey } from '@/types';
import { useGetTopic } from '@/services/topics-service';

type EditTopicProps = {
  opened: boolean,
  close: () => void,
  currentId?: TopicKey,
  onSubmit: (values: NewTopicType, id?: TopicKey) => Promise<void>,
};

const initialValues = { name: '', disabled: false } as NewTopicType;

export function EditTopic({ currentId, onSubmit, opened, close } : EditTopicProps) {
  const { data } = useGetTopic(currentId);

  const form = useForm<NewTopicType>({
    mode: 'uncontrolled',
    initialValues,
    validate: {
      name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
    },
  });

  useEffect(() => {
    if (!opened) return;
    form.setInitialValues(data ?? initialValues);
    form.reset();
  }, [data, opened]);

  const handleSubmit = form.onSubmit((values) => onSubmit(values, currentId));

  return (
    <Modal opened={opened} onClose={close} size="md" title={<Text size="lg" fw={700}>Topic</Text>}>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            key={form.key('name')}
            placeholder="Name"
            mt="md"
            {...form.getInputProps('name')}
          />
          <Switch
            label="Disabled"
            key={form.key('disabled')}
            mt="md"
            {...form.getInputProps('disabled', { type: 'checkbox' })}
          />
          <Group justify="right">
            <Button type="submit" mt="md">Submit</Button>
          </Group>
        </form>
    </Modal>
  );
}
