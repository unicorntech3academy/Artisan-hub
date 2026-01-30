
import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Landing } from './components/Landing';

const AppContent: React.FC = () => {
  const { currentUser } = useApp();
  const [showAuth, setShowAuth] = useState(false);

  // Flow: 
  // 1. If logged in -> Dashboard
  // 2. If not logged in & showAuth is true -> Auth (Login/Signup)
  // 3. Otherwise -> Landing Page

  if (currentUser) {
    return (
      <Layout>
        <Dashboard />
      </Layout>
    );
  }

  if (showAuth) {
    return (
      <div className="relative">
        <button 
          onClick={() => setShowAuth(false)}
          className="absolute top-8 left-8 text-emerald-600 font-bold hover:underline z-50 flex items-center gap-1"
        >
          ← Back to Site
        </button>
        <Auth />
      </div>
    );
  }

  return (
    <Landing 
      onLogin={() => setShowAuth(true)} 
      onSignUp={() => setShowAuth(true)} 
    />
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
