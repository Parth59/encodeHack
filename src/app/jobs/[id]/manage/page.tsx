"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Link from 'next/link';
import { jobListings } from '@/app/data/jobListings';
import TalentProtocolABI from '@/app/data/abi.json';
import { ethers } from 'ethers';
const talentProtocolSC = "0x838382076023ddf7998f0f8280dd9b47d9cf986b";


interface TokenModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (amount: string, walletAddress : string) => void;
    walletAddress: string;
}  

const TokenModal: React.FC<TokenModalProps> = ({ isOpen, onClose, onSubmit, walletAddress }) => {
    const [amount, setAmount] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <h3 className="text-lg font-semibold mb-4">Send Tokens to {walletAddress}</h3>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-4"
            placeholder="Enter number of tokens"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSubmit(amount, walletAddress);
                setAmount('');
              }}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              disabled={!amount}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

const DocumentLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-sm text-blue-500 hover:text-blue-600 mr-4"
    >
      <svg 
        className="w-4 h-4 mr-1" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
        />
      </svg>
      {label}
    </a>
  );




export default function ManageJobPage() {


    

    const { id } = useParams();
    const job = jobListings.find(job => job.id === Number(id));

    // Mock applicants data (replace with your actual data structure)
    const mockApplicants = job?.applicants;

  const router = useRouter();
  const { isConnected, address } = useAccount();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState(job);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<typeof mockApplicants[0] | null>(null);

  if (!job) {
    return (
      <div className="min-h-screen px-8 py-12 flex flex-col items-center">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-2xl font-bold text-red-500">Job Not Found</h1>
          <Link href="/jobs" className="text-blue-500 hover:text-blue-600 mt-4 inline-block">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  if (job.postedBy !== address) {
    return (
      <div className="min-h-screen px-8 py-12 flex flex-col items-center">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-2xl font-bold text-red-500">Unauthorized</h1>
          <p className="mt-2 text-gray-600">You don't have permission to manage this job posting.</p>
          <Link href="/jobs" className="text-blue-500 hover:text-blue-600 mt-4 inline-block">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    console.log('Saving edited job:', editedJob);
    setIsEditing(false);
    // Add your save logic here
  };

  const handleStatusChange = (applicantId: number, newStatus: 'accepted' | 'rejected' | 'pending') => {
    console.log('Changing applicant status:', { applicantId, newStatus });
    // Add your status change logic here
  };

  const handleSendTokens = (applicant: any) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  };

  const readContract = useReadContract({
    address: talentProtocolSC,
    abi: TalentProtocolABI,
    functionName: 'balanceOf',
    query: {
      enabled: false, 
    },
    args: ["0x0469FeBCB23e788e9611d7Bfb6Ee71AC04EF6DfA"]
  })

  const { writeContract, isSuccess } = useWriteContract();

  const handleTokenSubmit = async (amount: string, walletAddress : string) => {
     writeContract({
        address: talentProtocolSC,
        abi: TalentProtocolABI,
        functionName: 'transfer',
        args: [walletAddress, Number(amount)*(10**18)],
      })
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen px-8 py-12 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Manage Job Posting</h1>
          <Link href="/jobs" className="text-blue-500 hover:text-blue-600">
            Back to Jobs
          </Link>
        </div>

        {/* Job Details Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editedJob?.title}
                onChange={(e) => setEditedJob({ ...editedJob!, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
              <textarea
                value={editedJob?.description}
                onChange={(e) => setEditedJob({ ...editedJob!, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <p className="text-gray-500">{job.company}</p>
                  <p className="text-sm text-gray-400">{job.location}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-blue-500 hover:text-blue-600"
                >
                  Edit
                </button>
              </div>
              <p className="text-gray-600">{job.description}</p>
            </div>
          )}
        </div>

        {/* Applicants Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Applicants</h2>
          {mockApplicants.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No applications yet</p>
          ) : (
            <div className="space-y-4">
              {mockApplicants.map((applicant) => (
                <div key={applicant.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{applicant.name}</h3>
                      <p className="text-gray-500">{applicant.email}</p>
                      <p className="text-sm text-gray-400">{applicant.walletAddress}</p>
                      <p className="text-sm text-gray-400">
                        Applied: {new Date(applicant.appliedAt).toLocaleDateString()}
                      </p>
                      <br></br>
                      <DocumentLink href={applicant.resume} label="Resume" />
                      <DocumentLink href={applicant.coverLetter} label="Cover Letter" />
                    </div>


                    <div className="space-x-2">
                      <button
                        onClick={() => handleStatusChange(applicant.id, 'accepted')}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(applicant.id, 'rejected')}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => handleSendTokens(applicant)}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Send Token
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <TokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTokenSubmit}
        walletAddress={selectedApplicant?.walletAddress || ''} // Pass wallet address
      />

    </div>
  );
}