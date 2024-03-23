import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@progress/kendo-theme-default/dist/all.css';

import App from './App';
import Login from './Login';
import Movies from './Movies';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Movies />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App>
        <RouterProvider router={router} />
      </App>
    </QueryClientProvider>
  </React.StrictMode>,
);
