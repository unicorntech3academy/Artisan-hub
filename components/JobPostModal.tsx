
import React, { useState } from 'react';
import { X, Sparkles, MapPin, Tag, Banknote, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EKITI_LGAS, JOB_CATEGORIES } from '../constants';
import { JobStatus, UserRole } from '../types';
import { enhanceJobDescription } from '../services/geminiService';

export const JobPostModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { currentUser, addJob } = useApp();
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: JOB_CATEGORIES[0],
    lga: EKITI_LGAS[0],
    budget: ''
  });

  if (!isOpen || !currentUser || currentUser.role !== UserRole.OWNER) return null;

  const handleEnhance = async () => {
    if (!form.description) return;
    setEnhancing(true);
    try {
      const improved = await enhanceJobDescription(form.description, form.category);
      setForm(prev => ({ ...prev, description: improved }));
    } catch (e) {
      console.error(e);
    } finally {
      setEnhancing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newJob = {
      id: Math.random().toString(36).substr(2, 9),
      ownerId: currentUser.id,
      title: form.title,
      description: form.description,
      category: form.category,
      lga: form.lga,
      budget: Number(form.budget),
      status: JobStatus.OPEN,
      createdAt: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
      addJob(newJob);
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Post a New Job</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
            <input 
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g., Fix leaking pipe in kitchen"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Tag className="w-4 h-4" /> Category
              </label>
              <select 
                className="w-full px-4 py-2 rounded-xl border border-gray-200"
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
              >
                {JOB_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> LGA
              </label>
              <select 
                className="w-full px-4 py-2 rounded-xl border border-gray-200"
                value={form.lga}
                onChange={e => setForm({...form, lga: e.target.value})}
              >
                {EKITI_LGAS.map(lga => <option key={lga} value={lga}>{lga}</option>)}
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="block text-sm font-semibold text-gray-700">Description</label>
              <button 
                type="button"
                onClick={handleEnhance}
                disabled={enhancing || !form.description}
                className="text-xs flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-700 disabled:text-gray-400 transition-colors"
              >
                {enhancing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                AI Enhance
              </button>
            </div>
            <textarea 
              required
              rows={4}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Describe the problem in detail..."
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <Banknote className="w-4 h-4" /> Estimated Budget (₦)
            </label>
            <input 
              required
              type="number"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g., 5000"
              value={form.budget}
              onChange={e => setForm({...form, budget: e.target.value})}
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all flex justify-center items-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? 'Posting...' : 'Post Job'}
            </button>
            <p className="text-center text-xs text-gray-500 mt-2 italic">
              Money will be held in escrow until job completion.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
