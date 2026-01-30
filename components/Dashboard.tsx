
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, JobStatus } from '../types';
import { Briefcase, MapPin, Calendar, PlusCircle, CheckCircle, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { JobPostModal } from './JobPostModal';

export const Dashboard: React.FC = () => {
  const { currentUser, jobs, users, profiles } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredJobs = currentUser?.role === UserRole.OWNER 
    ? jobs.filter(j => j.ownerId === currentUser.id)
    : jobs.filter(j => j.status === JobStatus.OPEN);

  const stats = currentUser?.role === UserRole.OWNER ? [
    { label: 'Total Jobs', value: filteredJobs.length, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Completed', value: filteredJobs.filter(j => j.status === JobStatus.COMPLETED).length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'In Progress', value: filteredJobs.filter(j => j.status === JobStatus.IN_PROGRESS).length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ] : [
    { label: 'Available Jobs', value: jobs.filter(j => j.status === JobStatus.OPEN).length, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Earnings (₦)', value: '0.00', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg Rating', value: '5.0', icon: CheckCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser?.fullName}!</h1>
          <p className="text-gray-500">Here's what's happening in your local Ekiti network.</p>
        </div>
        {currentUser?.role === UserRole.OWNER && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200"
          >
            <PlusCircle className="w-5 h-5" /> Post a Job
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`${stat.bg} ${stat.color} p-4 rounded-xl`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {currentUser?.role === UserRole.OWNER ? 'Your Recent Jobs' : 'Recommended Jobs for You'}
          </h2>
          <button className="text-sm font-semibold text-emerald-600 flex items-center gap-1 hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${
                  job.status === JobStatus.OPEN ? 'bg-emerald-100 text-emerald-700' :
                  job.status === JobStatus.IN_PROGRESS ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {job.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">{job.category}</p>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{job.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{job.description}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{job.lga}, Ekiti</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="text-lg font-bold text-gray-900">₦{job.budget.toLocaleString()}</div>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                  {currentUser?.role === UserRole.OWNER ? 'View Details' : 'Bid Now'}
                </button>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
              <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                {currentUser?.role === UserRole.OWNER 
                  ? "You haven't posted any jobs yet. Start by posting one!" 
                  : "There are no jobs matching your profile in your area right now."}
              </p>
            </div>
          )}
        </div>
      </section>

      {currentUser?.role === UserRole.OWNER && (
        <section className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">Finding quality artisans in Ekiti just got easier.</h2>
              <p className="text-emerald-100 mb-6">Every artisan is vetted with NIN/BVN verification and local LGA checks to ensure you get the best hands.</p>
              <button className="bg-white text-emerald-900 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-xl">
                How EAC works
              </button>
            </div>
            <div className="hidden md:block">
              <div className="w-48 h-48 bg-emerald-800/50 rounded-full flex items-center justify-center backdrop-blur-sm border border-emerald-700">
                <ShieldCheck className="w-24 h-24 text-emerald-400" />
              </div>
            </div>
          </div>
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl"></div>
        </section>
      )}

      <JobPostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
