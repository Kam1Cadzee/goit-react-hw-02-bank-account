import React from 'react';
import Dashboard from './Dashboard/Dashboard';
import { ToastProvider } from 'react-toast-notifications';
const App = () => {
  return (
    <ToastProvider autoDismissTimeout={4000}>
      <div className="app">
        <Dashboard />
      </div>
    </ToastProvider>
  );
};

export default App;
