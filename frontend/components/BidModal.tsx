import React, { useState } from 'react';
import { X, Banknote, MessageSquare, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Job } from '../types';

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export const BidModal: React.FC<BidModalProps> = ({ isOpen, onClose, job }) => {
  const { addBid } = useApp();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    amount: '',
    proposal: ''
  });

  if (!isOpen || !job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addBid(job.id, {
        amount: Number(form.amount),
        proposal: form.proposal
      });
      onClose();
      setForm({ amount: '', proposal: '' });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Place a Bid</h2>
            <p className="text-sm text-gray-500 line-clamp-1">{job.title}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <Banknote className="w-4 h-4" /> Bid Amount (₦)
            </label>
            <input 
              required
              type="number"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder={`Max budget: ₦${job.budget.toLocaleString()}`}
              value={form.amount}
              onChange={e => setForm({...form, amount: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <MessageSquare className="w-4 h-4" /> Your Proposal
            </label>
            <textarea 
              required
              rows={4}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Explain why you're the best person for this job..."
              value={form.proposal}
              onChange={e => setForm({...form, proposal: e.target.value})}
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all flex justify-center items-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? 'Submitting...' : 'Submit Bid'}
            </button>
            <p className="text-center text-xs text-gray-500 mt-2 italic">
              You can't withdraw a bid once submitted.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
