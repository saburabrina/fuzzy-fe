import './App.css';
import '@progress/kendo-theme-default/dist/all.css';

import AppHeader from './AppHeader';
import { useLocation } from 'react-router-dom';

function App({ children }) {
  const location = useLocation();

  return (
    <div className="app">
      {!location.pathname.includes('login') && <AppHeader />}
      <div className="container">{children}</div>
    </div>
  );
}

export default App;
