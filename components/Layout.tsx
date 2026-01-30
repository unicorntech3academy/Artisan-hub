
import React from 'react';
import { useApp } from '../context/AppContext';
import { LogOut, User as UserIcon, Bell, Home, Search, PlusCircle, Briefcase } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, setCurrentUser } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent hidden sm:block">
                Ekiti Artisan Connect
              </span>
              <span className="text-xl font-bold text-emerald-600 sm:hidden">EAC</span>
            </div>

            <div className="flex items-center gap-4">
              {currentUser ? (
                <>
                  <button className="p-2 text-gray-500 hover:text-emerald-600 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  </button>
                  <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                    <div className="hidden md:block text-right">
                      <p className="text-sm font-medium text-gray-900">{currentUser.fullName}</p>
                      <p className="text-xs text-gray-500 capitalize">{currentUser.role.toLowerCase()}</p>
                    </div>
                    <button 
                      onClick={() => setCurrentUser(null)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex gap-3">
                  <button className="text-sm font-medium text-gray-600 hover:text-emerald-600">Login</button>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all">
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:px-8 pb-24 lg:pb-6">
        {children}
      </main>

      {currentUser && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-around items-center lg:hidden z-50">
          <button className="flex flex-col items-center text-emerald-600">
            <Home className="w-6 h-6" />
            <span className="text-[10px] mt-1 font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Search className="w-6 h-6" />
            <span className="text-[10px] mt-1 font-medium">Explore</span>
          </button>
          {currentUser.role === 'OWNER' && (
            <button className="flex flex-col items-center -mt-8 bg-emerald-600 text-white p-3 rounded-full shadow-lg border-4 border-gray-50">
              <PlusCircle className="w-6 h-6" />
            </button>
          )}
          <button className="flex flex-col items-center text-gray-400">
            <Briefcase className="w-6 h-6" />
            <span className="text-[10px] mt-1 font-medium">Jobs</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <UserIcon className="w-6 h-6" />
            <span className="text-[10px] mt-1 font-medium">Profile</span>
          </button>
        </nav>
      )}

      <footer className="hidden lg:block bg-white border-t border-gray-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Ekiti Artisan Connect. Proudly built for the Land of Honour.</p>
        </div>
      </footer>
    </div>
  );
};
