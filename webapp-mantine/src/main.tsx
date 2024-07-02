import ReactDOM from 'react-dom/client';
import App from './App';

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return null;
  }
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

export const isMockHostEnabled = import.meta.env.VITE_MOCK_IS_ENABLED;

function startApp() {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
}

if (isMockHostEnabled !== '0') {
  enableMocking().then(startApp);
} else {
  startApp();
}
