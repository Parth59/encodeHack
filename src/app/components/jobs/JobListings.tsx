import React from 'react';
import { JobCard } from './JobCard';
import { jobListings } from '@/app/data/jobListings';

export const JobListings: React.FC = () => {
  return (
    <div className="grid bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <h3 className="text-sm font-semibold bg-gray-100 p-2 text-center">Available Job</h3>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobListings
          .filter(job => job.status === 'Open')
          .map(job => (
            <JobCard key={job.id} job={job} />
          ))}
      </div>
    </div>
  );
};
