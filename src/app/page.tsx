"use client";
import React from 'react';
import { useAccount } from "wagmi";
import { JobListings } from '@/app/components/jobs/JobListings';
import { JobPostings } from './components/jobs/JobPostings';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
      <header className="w-full py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/walletconnect.png" alt="logo" className="w-10 h-10 mr-2" />
          <div className="hidden sm:inline text-xl font-bold">Reown - AppKit + Rootstock</div>
        </div>
      </header>
      <h2 className="my-8 text-2xl font-bold leading-snug text-center">Examples</h2>
      <div className="max-w-4xl w-full">
        <div className="grid bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <h3 className="text-sm font-semibold bg-gray-100 p-2 text-center">Connect your wallet</h3>
          <div className="flex justify-center items-center p-4">
            <w3m-button />
          </div>
        </div> 
        <br></br>
        {isConnected && (
          <>
            <div className="grid bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <h3 className="text-sm font-semibold bg-gray-100 p-2 text-center">Network selection button</h3>
              <div className="flex justify-center items-center p-4">
                <w3m-network-button />
              </div>
            </div>
            <br></br>
            <JobListings />
            <br></br>
            <JobPostings />
          </>
        )}
      </div>
    </main>
  );
}
