import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@progress/kendo-theme-default/dist/all.css';

import Movies from './Movies';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Movies />
    </QueryClientProvider>
  );
}

export default App;
