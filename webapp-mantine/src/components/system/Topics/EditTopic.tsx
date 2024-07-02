import { Button, Group, Modal, Switch, Text, TextInput } from '@mantine/core';
import React, { useEffect } from 'react';
import { hasLength, useForm } from '@mantine/form';
import { TopicKey, TopicType } from '@/types';

type EditTopicProps = {
  opened: boolean,
  close: () => void,
  currentId?: TopicKey,
  onSubmit: (values: Record<string, any>) => void,
};

export function EditTopic({ currentId, onSubmit, opened, close } : EditTopicProps) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', disabled: false },
    validate: {
      name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
    },
  });

  useEffect(() => {
    form.reset();
    if (!opened) return;
    if (currentId && currentId > 0) {
      form.setValues({
        name: `Row ${currentId}`, disabled: true,
      });
    } else {
      form.setValues({ name: '', disabled: false } as TopicType);
    }
  }, [currentId, opened]);

  const handleSubmit = form.onSubmit(onSubmit);

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
