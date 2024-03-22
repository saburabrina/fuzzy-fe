import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@progress/kendo-theme-default/dist/all.css';

//import Login from './Login'
import Movies from './Movies';

const queryClient = new QueryClient();

function App() {
  //const loggedIn = false;
  //const component = loggedIn? <Movies /> : <Login />;

  return (
    <QueryClientProvider client={queryClient}>
      <Movies />
    </QueryClientProvider>
  );
}

export default App;
