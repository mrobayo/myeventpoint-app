import ReactDOM from 'react-dom/client';
import '@mantine/dates/styles.css';

import App from './App';

async function enableMocking() {
  // if (process.env.NODE_ENV !== 'development') {
  //   return null;
  // }
  if (import.meta.env.MODE !== 'development') {
    return null;
  }
  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
});
