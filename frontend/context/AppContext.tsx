
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Job, Bid, Profile } from '../types';
import api from '../services/api';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  jobs: Job[];
  addJob: (jobData: any) => Promise<void>;
  updateJob: (id: string, updates: Partial<Job>) => Promise<void>;
  bids: Bid[];
  addBid: (jobId: string, bidData: any) => Promise<void>;
  profiles: Profile[];
  registerUser: (userData: any) => Promise<void>;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  activeView: 'landing' | 'dashboard' | 'auth';
  setActiveView: (view: 'landing' | 'dashboard' | 'auth') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [activeView, setActiveView] = useState<'landing' | 'dashboard' | 'auth'>('landing');

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs/');
      const mappedJobs = res.data.map((j: any) => ({
        ...j,
        ownerId: String(j.owner),
        artisanId: j.artisan ? String(j.artisan) : undefined,
        budget: Number(j.budget),
        createdAt: j.created_at,
        id: String(j.id),
        bids: (j.bids || []).map((b: any) => ({
          ...b,
          id: String(b.id),
          jobId: String(j.id),
          artisanId: String(b.artisan),
          amount: Number(b.amount),
          createdAt: b.created_at
        }))
      }));
      setJobs(mappedJobs);
      
      const allBids = mappedJobs.flatMap((j: any) => j.bids || []);
      setBids(allBids);
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    }
  };

  const addJob = async (jobData: any) => {
    try {
      const res = await api.post('/jobs/', jobData);
      const newJob = {
        ...res.data,
        ownerId: String(res.data.owner),
        budget: Number(res.data.budget),
        createdAt: res.data.created_at,
        id: String(res.data.id)
      };
      setJobs((prev: Job[]) => [newJob, ...prev]);
    } catch (error) {
      console.error('Failed to add job', error);
      throw error;
    }
  };

  const updateJob = async (id: string, updates: Partial<Job>) => {
    try {
      const res = await api.patch(`/jobs/${id}/`, updates);
      setJobs((prev: Job[]) => prev.map((j: Job) => (j.id === id ? { ...j, ...res.data } : j)));
    } catch (error) {
      console.error('Failed to update job', error);
      throw error;
    }
  };

  const addBid = async (jobId: string, bidData: any) => {
    try {
      const res = await api.post(`/jobs/${jobId}/bid/`, bidData);
      const newBid = {
        ...res.data,
        id: String(res.data.id),
        jobId: String(jobId),
        artisanId: String(res.data.artisan),
        amount: Number(res.data.amount),
        createdAt: res.data.created_at
      };
      setBids((prev: Bid[]) => [newBid, ...prev]);
      
      // Also update the job's local bid list if necessary
      await fetchJobs(); 
    } catch (error) {
      console.error('Failed to submit bid', error);
      throw error;
    }
  };
  // Initial Seed Data - simplified, we'll fetch from backend eventually
  useEffect(() => {
    // Check if user is already logged in (session cookie)
    api.get('/auth/me/').then(res => {
      if (res.data && (res.data.email || res.data.id)) {
        setCurrentUser({
          ...res.data,
          id: String(res.data.id)
        });
        // If we found a session, and we are on landing, maybe stay on landing?
        // But user said they want to see landing page on refresh.
        // So we keep activeView as 'landing' by default.
      }
    }).catch(() => {
      // Not logged in or session expired
      setCurrentUser(null);
    }).finally(() => {
      // Always fetch public jobs
      fetchJobs();
    });
  }, []);

  const registerUser = async (userData: any) => {
    try {
      await api.post('/auth/register/', userData);
      // No longer logging in automatically
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const login = async (credentials: any) => {
    try {
      const res = await api.post('/auth/login/', credentials);
      setCurrentUser({
        ...res.data,
        id: String(res.data.id)
      });
      setActiveView('dashboard');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout/');
      setCurrentUser(null);
      setActiveView('landing');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      jobs, addJob, updateJob,
      bids, addBid,
      profiles,
      registerUser, login, logout,
      activeView, setActiveView
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
