import React from 'react';
import type { JobListing } from '@/app/data/jobListings';
import Link from 'next/link';

interface JobCardProps {
  job: JobListing;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <div className="flex items-center mb-4">
        <img src={job.logo} alt={`${job.company} logo`} className="w-12 h-12 mr-4 rounded-full" />
        <div>
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-500">{job.company}</p>
          <p className="text-sm text-gray-400">{job.location}</p>
        </div>
      </div>

      <Link 
        href={`/jobs/${job.id}/apply`}
        className="block w-full bg-blue-500 text-white text-center py-2 rounded-xl hover:bg-blue-600"
      >
        Apply Now
      </Link>
      
    </div>
  );
};