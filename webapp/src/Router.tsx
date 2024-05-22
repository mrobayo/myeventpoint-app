import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '@/pages/Home.page';
import { EventMachinePage } from '@/pages/EventMachine.page';
import UserAccount from '@/pages/UserAccount';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: 'account',
        element: <UserAccount />,
      },
    ],
  },
  {
    path: '/machine',
    element: <EventMachinePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
