import { useEffect } from 'react';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { Router } from './Router';
import { theme } from './theme';

const modeEnv = import.meta.env.MODE;

export default function App() {
  useEffect(() => {
      (async () => {
          const response = await fetch('http://localhost:8080/user');

          console.log('** response', response.status);
          console.log('** response', await response.json());
      })();

      console.log('import.meta.env.MODE', modeEnv);
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}
