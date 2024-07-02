import React, { useEffect } from 'react';

import { Modal, Button, Group, Text, TextInput, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { hasLength, useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import { TopicType } from '@/types';
import { useCreateTopic } from '@/services/topics-service';

type TopicNewModalProps = { data?: TopicType, onSaved: () => void };

export const TopicNewModal = ({ data, onSaved }: TopicNewModalProps) => {
  const [opened, { close, open }] = useDisclosure(false);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', disabled: false },
    validate: {
      name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
    },
  });
  const { mutateAsync: createNew, isPending } = useCreateTopic();

  useEffect(() => {
    if (data) {
      console.log('set data', data);
      form.initialize(data);
    }
  }, [data]);

  const handleSubmit = form.onSubmit(async (newValues) => {
    const newObject: TopicType = { id: -1, ...newValues };
    await createNew(newObject);
    onSaved?.();
    close();
  });

  return (
    <>
      <Modal opened={opened} onClose={close} size="md" title={<Text size="lg" fw={700}>Add Topic</Text>}>

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
            <Button type="submit" mt="md" disabled={isPending}>Submit</Button>
          </Group>

        </form>
      </Modal>

      <Button
        onClick={() => {
          form.reset();
          form.initialize({ name: 'New Topic...', disabled: false } as TopicType);
          open();
      }}
        leftSection={<IconPlus size={14} />}>Add
      </Button>
    </>
  );
};
