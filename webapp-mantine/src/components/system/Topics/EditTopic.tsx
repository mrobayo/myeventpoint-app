import React, { useEffect } from 'react';
import { Button, Group, Modal, Switch, Text, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { TopicKey, TopicType } from '@/types';
import { useGetTopic } from '@/services/topics-service';

type EditTopicProps = {
  opened: boolean,
  close: () => void,
  currentId: TopicKey,
  onSubmit: (id: TopicKey, values: Record<string, any>) => void,
};

const initialValues = { name: '', disabled: false } as TopicType;

export function EditTopic({ currentId, onSubmit, opened, close } : EditTopicProps) {
  const { data } = useGetTopic(currentId);

  const form = useForm({
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

  const handleSubmit = form.onSubmit((values) => {
    onSubmit(currentId, values);
  });

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
