"use client";
import React, { useState } from 'react';
import { useAccount } from "wagmi";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { JobForm } from '@/app/components/jobs/JobForm';
import type { JobFormData } from '@/app/data/JobForm';

export default function AddJobPage() {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    location: '',
    description: '',
    logo: 'https://via.placeholder.com/50',
    link: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Job:', { 
      ...formData, 
      status: 'Open', 
      id: Date.now(),
      postedBy: address,
      postedAt: new Date().toISOString()
    });
    router.push('/jobs');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen px-8 py-12 flex flex-col items-center">
        <div className="max-w-2xl w-full">
          <div className="grid bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <h3 className="text-sm font-semibold bg-gray-100 p-2 text-center">Connect your wallet to add jobs</h3>
            <div className="flex justify-center items-center p-4">
              <w3m-button />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-12 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Add New Job</h1>
          <Link href="/jobs" className="text-blue-500 hover:text-blue-600">
            Back to Jobs
          </Link>
        </div>
        <JobForm
          formData={formData}
          address={address}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}