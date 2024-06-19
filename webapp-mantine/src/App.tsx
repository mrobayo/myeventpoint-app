import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Router } from './Router';
import { theme } from './theme';

//const modeEnv = import.meta.env.MODE;
//const isDevelopment = import.meta.env.DEV;

const queryClient = new QueryClient();
//const reactQueryDevtools = isDevelopment ? <ReactQueryDevtools initialIsOpen={false} /> : undefined;

export default function App() {
  // useEffect(() => {
  //   (async () => {
  //         const response = await fetch('http://localhost:8080/user');
  //         console.log('** response', response.status);
  //         console.log('** response', await response.json());
  //     })();
  //     //console.log('import.meta.env.MODE', modeEnv);
  // }, []);
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </MantineProvider>
  );
}
