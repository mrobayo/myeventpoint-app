import { AppShell, Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { TopicsView } from '@/components/system/Topics';
import railway from '@/images/railway.png';

export function HomePage() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <img src={railway} alt="Icon by Design Circle" width={42} height={42} />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        Navbar
      </AppShell.Navbar>

      <AppShell.Main>

          <TopicsView />

      </AppShell.Main>

    </AppShell>
  );
}
