"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAccount } from "wagmi";
import Link from 'next/link';
import { jobListings } from '@/app/data/jobListings';

interface Reference {
  name: string;
  position: string;
  company: string;
  email: string;
  phone?: string;  // Optional phone number
}

interface ApplicationFormData {
  name: string;
  email: string;
  resume: string;
  coverLetter: string;
  portfolio: string;
  references: Reference[];  // New field for references
}

export default function ApplyJobPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isConnected, address } = useAccount();
  
  const job = jobListings.find(job => job.id === Number(id));
  
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    resume: '',
    coverLetter: '',
    portfolio: '',
    references: [{ name: '', position: '', company: '', email: '', phone: '' }]  // Initial empty reference
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:9999/api/jobs/${id}/applicants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          walletAddress: address,
          resume: formData.resume,
          coverLetter: formData.coverLetter,
          portfolio: formData.portfolio,
          references: formData.references
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      // Successful submission
      alert('Application submitted successfully!');
      router.push('/jobs');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReferenceChange = (index: number, field: keyof Reference, value: string) => {
    setFormData(prev => {
      const newReferences = [...prev.references];
      newReferences[index] = { ...newReferences[index], [field]: value };
      return { ...prev, references: newReferences };
    });
  };

  const addReference = () => {
    setFormData(prev => ({
      ...prev,
      references: [...prev.references, { name: '', position: '', company: '', email: '', phone: '' }]
    }));
  };

  const removeReference = (index: number) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen px-8 py-12 flex flex-col items-center">
        <div className="max-w-2xl w-full">
          <div className="grid bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <h3 className="text-sm font-semibold bg-gray-100 p-2 text-center">Connect your wallet to apply</h3>
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
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Apply for Position</h1>
            <Link href="/jobs" className="text-blue-500 hover:text-blue-600">
              Back to Jobs
            </Link>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company} • {job.location}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wallet Address
              </label>
              <input
                type="text"
                value={address}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume Link
              </label>
              <input
                type="url"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Why are you interested in this position?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio/GitHub
              </label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Link to your portfolio or GitHub profile"
              />
            </div>

            {/* References Section */}
            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">References</h3>
                <button
                  type="button"
                  onClick={addReference}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  + Add Reference
                </button>
              </div>

              {formData.references.map((reference, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-gray-700">Reference {index + 1}</h4>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeReference(index)}
                        className="text-sm text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={reference.name}
                        onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <input
                        type="text"
                        value={reference.position}
                        onChange={(e) => handleReferenceChange(index, 'position', e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={reference.company}
                        onChange={(e) => handleReferenceChange(index, 'company', e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={reference.email}
                        onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={reference.phone}
                        onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}