import React from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { EventTable } from '@/components/EventTable/EventTable';
import { MainHeader } from '@/components/MainHeader/MainHeader';
import { EventSideBar } from '@/components/EventSideBar';

export function HomePage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 320,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <MainHeader opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p="md">
          <EventSideBar />
      </AppShell.Navbar>
      <AppShell.Main>
          <><Welcome /><ColorSchemeToggle />
          <EventTable />
          </>

      </AppShell.Main>
    </AppShell>
  );
}
