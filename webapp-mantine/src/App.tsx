import React from 'react';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Router } from './Router';
import { theme } from './theme';

//const modeEnv = import.meta.env.MODE;
const isDevelopment = import.meta.env.DEV;

const queryClient = new QueryClient();
const reactQueryDevtools = isDevelopment ? <ReactQueryDevtools initialIsOpen={false} /> : undefined;

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <MantineProvider>
        <Notifications />
        <ModalsProvider>
          <QueryClientProvider client={queryClient}>
            <Router />
            {reactQueryDevtools}

          </QueryClientProvider>
        </ModalsProvider>
      </MantineProvider>
    </MantineProvider>
  );
}
