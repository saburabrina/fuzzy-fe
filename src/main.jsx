import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@progress/kendo-theme-default/dist/all.css';

import App from './App';
import Login from './Login';
import Movies from './Movies';
import CreateUser from './CreateUser';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <App>
        <Login />
      </App>
    ),
  },
  {
    path: '/',
    element: (
      <App>
        <Movies />
      </App>
    ),
  },
  {
    path: '/create-user',
    element: (
      <App>
        <CreateUser />
      </App>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
