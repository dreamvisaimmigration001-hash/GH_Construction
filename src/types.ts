export type ProjectCategory =
  | 'All'
  | 'Healthcare & Medical'
  | 'Commercial'
  | 'Restaurant'
  | 'Retail'
  | 'Residential';

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  industry: string;
  location: string;
  year?: string;
  heroImage: string;
  images: string[];
  description: string;
  scope: string[];
  highlights?: string[];
  clientType?: string;
  featuredOnHome?: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export interface IndustryItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  featuredProjects: string[];
  keyConsiderations: string[];
  coverImage: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  projectOrSector?: string;
}

export interface PartnerClient {
  name: string;
  type: string;
  description?: string;
}

export interface ContactInquiry {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  projectType: string;
  targetTimeline: string;
  estimatedBudget: string;
  message: string;
}

export interface JobPosition {
  id: string;
  referenceNo: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experienceLevel: string;
  salaryRange?: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  postedDate: string;
}

export interface ApplicationStatusRecord {
  referenceNo: string;
  candidateName: string;
  positionTitle: string;
  positionRef: string;
  submissionDate: string;
  department: string;
  status: 'Received' | 'In Review' | 'Interview Scheduled' | 'Shortlisted' | 'Offer Extended';
  statusStep: 1 | 2 | 3 | 4;
  lastUpdated: string;
  notes: string;
  assignedManager: string;
}
