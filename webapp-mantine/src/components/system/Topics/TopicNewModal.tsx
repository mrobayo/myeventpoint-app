import React, { useState } from 'react';

import { Modal, Button, Group, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';

export const TopicNewModal = () => {
  const [opened, { close, open }] = useDisclosure(false);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: 'enter it', email: '' },
    validate: {
      name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
      email: isEmail('Invalid email'),
    },
  });

  const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);

  const handleSubmit = form.onSubmit((newValues) => {
    setSubmittedValues(newValues);
    close();
  });

  return (
    <>
      <Modal opened={opened} onClose={close} size="md" title={<Text size="lg" fw={700}>Add Topic</Text>}>

        <form onSubmit={handleSubmit}>
          <TextInput
            {...form.getInputProps('name')}
            key={form.key('name')}
            label="Name"
            placeholder="Name"
          />
          <TextInput
            {...form.getInputProps('email')}
            key={form.key('email')}
            mt="md"
            label="Email"
            placeholder="Email"
          />

          <Group justify="right">
            <Button type="submit" mt="md">Submit</Button>
          </Group>

        </form>
      </Modal>

      <Button onClick={open} leftSection={<IconPlus size={14} />}>Add</Button>
    </>
  );
};
