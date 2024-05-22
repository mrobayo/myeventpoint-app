import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '@/pages/Home.page';
import {EventMachinePage} from '@/pages/EventMachine.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/machine',
    element: <EventMachinePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
