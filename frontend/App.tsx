import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Landing } from './components/Landing';

const AppContent: React.FC = () => {
  const { currentUser, activeView, setActiveView } = useApp();

  // Flow: 
  // 1. If activeView is 'dashboard' and logged in -> Dashboard
  // 2. If activeView is 'auth' -> Auth (Login/Signup)
  // 3. Otherwise -> Landing Page

  if (activeView === 'dashboard' && currentUser) {
    return (
      <Layout>
        <Dashboard />
      </Layout>
    );
  }

  if (activeView === 'auth') {
    return (
      <div className="relative min-h-screen bg-gray-50">
        <button 
          onClick={() => setActiveView('landing')}
          className="absolute top-8 left-8 text-emerald-600 font-bold hover:text-emerald-700 transition-colors z-50 flex items-center gap-2 group"
        >
          <div className="bg-white p-2 rounded-xl shadow-sm border border-emerald-100 group-hover:shadow-md transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="hidden sm:inline">Back to Home</span>
        </button>
        <Auth />
      </div>
    );
  }

  return (
    <Landing 
      onLogin={() => setActiveView('auth')} 
      onSignUp={() => setActiveView('auth')} 
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
