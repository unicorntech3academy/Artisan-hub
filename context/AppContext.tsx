
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Job, Bid, Profile, UserRole, JobStatus } from '../types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  jobs: Job[];
  addJob: (job: Job) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  bids: Bid[];
  addBid: (bid: Bid) => void;
  profiles: Profile[];
  users: User[]; // Mocking database of users
  registerUser: (user: User, profile: Profile) => void;
  login: (email: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);

  // Initial Seed Data
  useEffect(() => {
    const savedUsers = localStorage.getItem('eac_users');
    const savedProfiles = localStorage.getItem('eac_profiles');
    const savedJobs = localStorage.getItem('eac_jobs');
    const savedBids = localStorage.getItem('eac_bids');

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedProfiles) setProfiles(JSON.parse(savedProfiles));
    if (savedJobs) setJobs(JSON.parse(savedJobs));
    if (savedBids) setBids(JSON.parse(savedBids));
  }, []);

  // Persistence
  useEffect(() => {
    localStorage.setItem('eac_users', JSON.stringify(users));
    localStorage.setItem('eac_profiles', JSON.stringify(profiles));
    localStorage.setItem('eac_jobs', JSON.stringify(jobs));
    localStorage.setItem('eac_bids', JSON.stringify(bids));
  }, [users, profiles, jobs, bids]);

  const registerUser = (user: User, profile: Profile) => {
    setUsers(prev => [...prev, user]);
    setProfiles(prev => [...prev, profile]);
    setCurrentUser(user);
  };

  const login = (email: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const addJob = (job: Job) => setJobs(prev => [job, ...prev]);

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(j => (j.id === id ? { ...j, ...updates } : j)));
  };

  const addBid = (bid: Bid) => setBids(prev => [bid, ...prev]);

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      jobs, addJob, updateJob,
      bids, addBid,
      profiles, users,
      registerUser, login
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
