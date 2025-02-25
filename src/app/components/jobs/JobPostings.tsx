import React from 'react';
import { useAccount } from 'wagmi';
import { jobListings } from '@/app/data/jobListings';
import Link from 'next/link';

export const JobPostings: React.FC = () => {
  const { address } = useAccount();

  // Filter jobs posted by the connected wallet
  const myPostedJobs = jobListings.filter(job => job.postedBy === address);

  return (
    <div className="grid bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <h3 className="text-sm font-semibold">My Job Postings</h3>
        <Link 
          href="/jobs/add" 
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors"
        >
          Post New Job
        </Link>
      </div>
      
      {myPostedJobs.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          You haven't posted any jobs yet.
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 gap-4">
          {myPostedJobs.map(job => (
            <div key={job.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img src={job.logo} alt={`${job.company} logo`} className="w-12 h-12 mr-4 rounded-full" />
                  <div>
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <p className="text-gray-500">{job.company}</p>
                    <p className="text-sm text-gray-400">{job.location}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {job.status}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Posted: {new Date(job.postedAt).toLocaleDateString()}</span>
                <div className="space-x-2">
                    <Link href={`/jobs/${job.id}/manage`} className="text-blue-500 hover:text-blue-600">
                      Manage
                    </Link>                 
                 <button className="text-red-500 hover:text-red-600">
                    {job.status === 'Open' ? 'Mark as Expired' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};