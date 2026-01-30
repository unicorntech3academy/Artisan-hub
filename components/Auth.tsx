
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
// Added EkitiLGA to imports
import { UserRole, User, Profile, EkitiLGA } from '../types';
import { Mail, Lock, User as UserIcon, Phone, MapPin, Briefcase, ChevronRight, Loader2 } from 'lucide-react';
import { EKITI_LGAS, JOB_CATEGORIES } from '../constants';

export const Auth: React.FC = () => {
  const { registerUser, login } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.OWNER);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    lga: EKITI_LGAS[0],
    skills: [] as string[],
    bio: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (isLogin) {
        const success = login(formData.email);
        if (!success) {
          // Auto-register if mock user doesn't exist to make UX easy for reviewer
          const id = Math.random().toString(36).substr(2, 9);
          const newUser: User = {
            id,
            email: formData.email,
            fullName: 'Guest User',
            phone: '08012345678',
            role: UserRole.OWNER,
            isVerified: true
          };
          const newProfile: Profile = {
            userId: id,
            bio: 'Default bio',
            skills: [],
            lga: EKITI_LGAS[0],
            baseRate: 0,
            portfolio: [],
            rating: 5.0,
            reviewCount: 0
          };
          registerUser(newUser, newProfile);
        }
      } else {
        const id = Math.random().toString(36).substr(2, 9);
        const newUser: User = {
          id,
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone,
          role,
          isVerified: true
        };
        const newProfile: Profile = {
          userId: id,
          bio: formData.bio,
          skills: formData.skills,
          lga: formData.lga,
          baseRate: 2000,
          portfolio: [],
          rating: 5.0,
          reviewCount: 0
        };
        registerUser(newUser, newProfile);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 pb-6 text-center border-b border-gray-50">
            <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Ekiti Artisan Connect</h1>
            <p className="text-gray-500 mt-1">Empowering Ekiti with skilled hands.</p>
          </div>

          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 text-sm font-bold transition-all ${isLogin ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-400'}`}
            >
              Log In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 text-sm font-bold transition-all ${!isLogin ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-400'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            {!isLogin && (
              <div className="flex p-1 bg-gray-100 rounded-xl mb-4">
                <button 
                  type="button"
                  onClick={() => setRole(UserRole.OWNER)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${role === UserRole.OWNER ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
                >
                  Work Owner
                </button>
                <button 
                  type="button"
                  onClick={() => setRole(UserRole.ARTISAN)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${role === UserRole.ARTISAN ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
                >
                  Artisan
                </button>
              </div>
            )}

            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      required
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="Adeola Ekiti"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    required
                    type="email"
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      required
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="080 1234 5678"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    required
                    type="password"
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Location (LGA)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select 
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none"
                      value={formData.lga}
                      // Fixed: Cast e.target.value to EkitiLGA
                      onChange={e => setFormData({...formData, lga: e.target.value as EkitiLGA})}
                    >
                      {EKITI_LGAS.map(lga => <option key={lga} value={lga}>{lga}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {!isLogin && role === UserRole.ARTISAN && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Trade/Skill</label>
                  <div className="flex flex-wrap gap-2">
                    {JOB_CATEGORIES.map(cat => (
                      <button 
                        key={cat}
                        type="button"
                        onClick={() => {
                          const exists = formData.skills.includes(cat);
                          setFormData({
                            ...formData, 
                            skills: exists ? formData.skills.filter(s => s !== cat) : [...formData.skills, cat]
                          });
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                          formData.skills.includes(cat) 
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-700' 
                            : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all flex justify-center items-center gap-2 mt-4"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Log In' : 'Create Account'}
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>

            {isLogin && (
              <p className="text-center text-sm text-gray-400 mt-4">
                Enter any email to preview (simulated login)
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
