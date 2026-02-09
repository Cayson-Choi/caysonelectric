export type CourseCategory = 'KEC' | 'Automation' | 'Power' | 'License';

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  description: string;
  price: number;
  isActive: boolean;
  createdAt: string;
}

export interface CourseSession {
  id: string;
  courseId: string;
  startDate: string;
  endDate: string;
  timeInfo: string;
  capacity: number;
  location: string;
  status: 'open' | 'closed' | 'full';
}

export interface Application {
  id: string;
  sessionId: string;
  applicantName: string;
  phone: string;
  email: string;
  depositorName: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  memo?: string;
  submittedAt: string;
}

export interface Lead {
  id: string;
  topic: string;
  company: string;
  contactName: string;
  phone: string;
  email: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  submittedAt: string;
}
