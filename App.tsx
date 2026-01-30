
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';

const AppContent: React.FC = () => {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Auth />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
