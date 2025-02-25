interface Applicant {
  id: number;
  name: string;
  email: string;
  walletAddress: string;
  appliedAt: string;
  status: 'pending' | 'shortlisted' | 'accepted' | 'rejected';
  resume: string;
  coverLetter: string;
  portfolio?: string;
  references: {
    name: string;
    position: string;
    company: string;
    email: string;
    phone?: string;
  }[];
}

export interface JobListing {
    id: number;
    title: string;
    company: string;
    location: string;
    description: string;
    logo: string;
    link: string;
    status: 'Open' | 'Expired';
    postedBy: string;
    postedAt: string;
    applicants: Applicant[];
  }
  
  export const jobListings: JobListing[] = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'Remote',
      description: 'We are looking for a Frontend Developer with experience in React, TypeScript, and modern web technologies. The ideal candidate will have 3+ years of experience building responsive web applications.',
      logo: 'https://via.placeholder.com/50',
      link: '#1',
      status: 'Open',
      postedBy: '0x0469FeBCB23e788e9611d7Bfb6Ee71AC04EF6DfA',
      postedAt: '2024-03-20T10:00:00Z',
      applicants: [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          walletAddress: "0x1234...5678",
          appliedAt: "2024-03-21T10:00:00Z",
          status: "pending",
          resume: "https://example.com/resume1.pdf",
          coverLetter: "https://example.com/coverletter1.pdf",
          portfolio: "https://github.com/johndoe",
          references: [
            {
              name: "Alice Johnson",
              position: "Senior Developer",
              company: "Tech Corp",
              email: "alice@techcorp.com",
              phone: "+1 (555) 123-4567"
            }
          ]
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          walletAddress: "0x5678...1234",
          appliedAt: "2024-03-22T10:00:00Z",
          status: "shortlisted",
          resume: "https://example.com/resume2.pdf",
          coverLetter: "https://example.com/coverletter2.pdf",
          portfolio: "https://janesmith.dev",
          references: [
            {
              name: "Bob Wilson",
              position: "Tech Lead",
              company: "Dev Inc",
              email: "bob@devinc.com",
              phone: "+1 (555) 987-6543"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'Data Systems',
      location: 'New York, NY',
      description: 'Seeking a Backend Developer proficient in Node.js, Python, and database technologies. Must have experience with microservices architecture and cloud platforms.',
      logo: 'https://via.placeholder.com/50',
      link: '#2',
      status: 'Open',
      postedBy: '0x0469FeBCB23e788e9611d7Bfb6Ee71AC04EF6DfA',
      postedAt: '2024-03-19T15:30:00Z',
      applicants: []
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Innovate Inc.',
      location: 'San Francisco, CA',
      description: 'Looking for an experienced Product Manager to lead our blockchain products. Should have a strong understanding of web3 technologies and user-centered design principles.',
      logo: 'https://via.placeholder.com/50',
      link: '#3',
      status: 'Open',
      postedBy: '0x3456789012abcdef3456789012abcdef34567890',
      postedAt: '2024-03-18T09:15:00Z',
      applicants: []
    }
  ];

