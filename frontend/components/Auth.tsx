
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
// Added EkitiLGA to imports
import { UserRole, User, Profile, EkitiLGA } from '../types';
import { Mail, Lock, User as UserIcon, Phone, MapPin, Briefcase, ChevronRight, Loader2, Info, X, ArrowLeft } from 'lucide-react';
import { EKITI_LGAS, JOB_CATEGORIES } from '../constants';

export const Auth: React.FC = () => {
  const { registerUser, login } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.OWNER);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    lga: EKITI_LGAS[0],
    skills: [] as string[],
    bio: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isLogin) {
        await login({ 
          username: formData.email, 
          password: formData.password 
        });
        setMessage({ type: 'success', text: 'Welcome back! Logging you in...' });
      } else {
        await registerUser({
          username: formData.email,
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phone: formData.phone,
          role: role,
          lga: formData.lga,
          bio: formData.bio,
          skills: formData.skills
        });
        setMessage({ type: 'success', text: 'Registration successful! Please log in now.' });
        setIsLogin(true);
        setFormData(prev => ({ ...prev, password: '' }));
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: isLogin ? 'Invalid email or password. Please try again.' : 'Registration failed. This email might already be used.' 
      });
    } finally {
      setLoading(false);
    }
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

          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}>
              {message.type === 'success' ? <Info className="w-5 h-5 mt-0.5 flex-shrink-0" /> : <Info className="w-5 h-5 mt-0.5 flex-shrink-0 rotate-180" />}
              <div className="flex-1 text-sm font-medium">{message.text}</div>
              <button onClick={() => setMessage(null)} className="p-1 hover:bg-black/5 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

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
                Login with your registered email
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
