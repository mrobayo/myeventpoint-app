import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '@/pages/Home.page';
import { EventMachinePage } from '@/pages/EventMachine.page';
import UserAccount from '@/pages/UserAccount';
import { CustomerService } from '@/pages/CustomerService';
import { TopicsList } from '@/components/System/Topics';
//import { Topics } from '@/components/System/Topics';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      { path: 'account', element: <UserAccount /> },
      { path: 'customer-service', element: <CustomerService /> },
    ],
  },
  {
    path: '/system',
    element: <HomePage />,
    children: [
      { path: 'topics', element: <TopicsList /> },
    ],
  },

  // {
  //   path: '/areas',
  //   element: <HomePage />,
  //   children: [
  //     { path: 'new', element: <Areas /> },
  //     { path: 'customer-service', element: <CustomerService /> },
  //   ],
  // },
  {
    path: '/machine',
    element: <EventMachinePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
