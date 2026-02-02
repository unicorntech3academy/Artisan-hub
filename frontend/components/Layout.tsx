import React from 'react';
import { useApp } from '../context/AppContext';
import { LogOut, User as UserIcon, Bell, Home, Search, PlusCircle, Briefcase } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, logout, setActiveView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 selection:bg-emerald-100 selection:text-emerald-900">
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex justify-between items-center h-20">
            <button 
              onClick={() => setActiveView('landing')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-emerald-600 p-2 rounded-xl">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent hidden sm:block tracking-tighter">
                Ekiti Artisan Connect
              </span>
              <span className="text-2xl font-black text-emerald-600 sm:hidden">EAC</span>
            </button>

            <div className="flex items-center gap-6">
              {currentUser ? (
                <>
                  <button className="p-2 text-gray-500 hover:text-emerald-600 relative transition-colors">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                  <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
                    <div className="hidden md:block text-right">
                      <p className="text-sm font-black text-gray-900">{currentUser.fullName}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{currentUser.role}</p>
                    </div>
                    <button 
                      onClick={() => logout()}
                      className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex gap-4">
                  <button onClick={() => setActiveView('login')} className="text-sm font-black text-gray-600 hover:text-emerald-600 transition-colors">Login</button>
                  <button onClick={() => setActiveView('signup')} className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-12 pb-32 lg:pb-12">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>

      {/* Mobile Navigation */}
      {currentUser && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-gray-200 px-8 py-4 flex justify-between items-center lg:hidden w-[90%] max-w-md rounded-[2.5rem] shadow-2xl z-50">
          <button className="flex flex-col items-center text-emerald-600 group">
            <Home className="w-6 h-6 transition-transform group-active:scale-90" />
            <span className="text-[10px] mt-1 font-black uppercase tracking-tighter">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 group">
            <Search className="w-6 h-6 transition-transform group-active:scale-90" />
            <span className="text-[10px] mt-1 font-black uppercase tracking-tighter">Explore</span>
          </button>
          {currentUser.role === 'OWNER' && (
            <button className="flex flex-col items-center -mt-12 bg-emerald-600 text-white p-4 rounded-3xl shadow-2xl border-4 border-gray-50 hover:bg-emerald-700 transition-all group active:scale-95">
              <PlusCircle className="w-7 h-7" />
            </button>
          )}
          <button className="flex flex-col items-center text-gray-400 group">
            <Briefcase className="w-6 h-6 transition-transform group-active:scale-90" />
            <span className="text-[10px] mt-1 font-black uppercase tracking-tighter">Jobs</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 group">
            <UserIcon className="w-6 h-6 transition-transform group-active:scale-90" />
            <span className="text-[10px] mt-1 font-black uppercase tracking-tighter">Profile</span>
          </button>
        </nav>
      )}

      <footer className="hidden lg:block bg-white border-t border-gray-100 mt-auto py-12">
        <div className="max-w-7xl mx-auto px-16 flex justify-between items-center text-gray-500 text-sm font-medium">
          <p>&copy; 2024 Ekiti Artisan Connect. Proudly built for the Land of Honour.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
