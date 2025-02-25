"use client";
import React from 'react';
import { useAccount } from "wagmi";
import { JobListings } from '@/app/components/jobs/JobListings';
import { JobPostings } from '@/app/components/jobs/JobPostings';
import Link from 'next/link';

export default function JobsPage() {
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
      <header className="w-full py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img src="/walletconnect.png" alt="logo" className="w-10 h-10 mr-2" />
            <div className="hidden sm:inline text-xl font-bold">Reown - Jobs</div>
          </Link>
        </div>
      </header>
      
      {!isConnected ? (
        <div className="max-w-4xl w-full">
          <div className="grid bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <h3 className="text-sm font-semibold bg-gray-100 p-2 text-center">Connect your wallet to view jobs</h3>
            <div className="flex justify-center items-center p-4">
              <w3m-button />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl w-full space-y-8">
          <JobPostings />
          <JobListings />
        </div>
      )}
    </main>
  );
}