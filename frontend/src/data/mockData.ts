import { Application } from '@/types/application'
import { User } from '@/types/auth'
import { AuditLog } from '@/types/audit'

export const mockApplications: Application[] = [
  {
    id: '1',
    applicantName: 'Ahmed Hassan',
    applicantEmail: 'ahmed@example.com',
    applicantPhone: '+1234567890',
    applicantAddress: '123 Medical District, Karachi, Pakistan',
    applicantProfession: 'Construction Worker',
    applicantOrganization: 'Local Construction Co.',
    applicantPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    category: 'Medical Assistance',
    title: 'Emergency Heart Surgery',
    description: 'Urgent medical assistance needed for heart surgery operation. Patient is a 45-year-old construction worker who suffered a heart attack and requires immediate surgical intervention.',
    requestedAmount: 25000,
    documents: [
      {
        id: '1a',
        name: 'applicant-photo.jpg',
        type: 'image/jpeg',
        category: 'photo',
        size: 145000,
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        uploadedAt: '2024-01-10T09:00:00Z'
      },
      {
        id: '1b',
        name: 'medical-report.pdf',
        type: 'application/pdf',
        category: 'medical',
        size: 1024000,
        url: '#',
        uploadedAt: '2024-01-10T10:00:00Z'
      },
      {
        id: '1c',
        name: 'identity-card.jpg',
        type: 'image/jpeg',
        category: 'identity',
        size: 256000,
        url: '#',
        thumbnail: '#',
        uploadedAt: '2024-01-10T09:30:00Z'
      },
      {
        id: '1d',
        name: 'hospital-estimate.pdf',
        type: 'application/pdf',
        category: 'medical',
        size: 512000,
        url: '#',
        uploadedAt: '2024-01-10T11:00:00Z'
      }
    ],
    status: 'under_review',
    submittedAt: '2024-01-10T09:00:00Z',
    assignedReviewer: 'Dr. Sarah Johnson',
    priority: 'urgent',
    tags: ['medical', 'emergency', 'surgery']
  },
  {
    id: '2',
    applicantName: 'Fatima Ali',
    applicantEmail: 'fatima@example.com',
    applicantPhone: '+1234567891',
    applicantAddress: '456 University Road, Lahore, Pakistan',
    applicantProfession: 'Student',
    applicantOrganization: 'Punjab University',
    applicantPhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150&h=150&fit=crop&crop=face',
    category: 'Education Support',
    title: 'University Tuition Assistance',
    description: 'Financial support needed for university education in computer science. Student has excellent academic record but facing financial difficulties.',
    requestedAmount: 15000,
    documents: [
      {
        id: '2a',
        name: 'applicant-photo.jpg',
        type: 'image/jpeg',
        category: 'photo',
        size: 128000,
        url: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150&h=150&fit=crop&crop=face',
        thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=80&h=80&fit=crop&crop=face',
        uploadedAt: '2024-01-09T14:00:00Z'
      },
      {
        id: '2b',
        name: 'acceptance-letter.pdf',
        type: 'application/pdf',
        category: 'education',
        size: 512000,
        url: '#',
        uploadedAt: '2024-01-09T14:30:00Z'
      },
      {
        id: '2c',
        name: 'academic-transcript.pdf',
        type: 'application/pdf',
        category: 'education',
        size: 768000,
        url: '#',
        uploadedAt: '2024-01-09T14:45:00Z'
      },
      {
        id: '2d',
        name: 'family-income-certificate.pdf',
        type: 'application/pdf',
        category: 'financial',
        size: 345000,
        url: '#',
        uploadedAt: '2024-01-09T15:00:00Z'
      }
    ],
    status: 'approved',
    submittedAt: '2024-01-09T14:00:00Z',
    reviewedAt: '2024-01-10T16:00:00Z',
    reviewedBy: 'Dr. Sarah Johnson',
    reviewComments: 'Excellent academic record and strong potential.',
    assignedReviewer: 'Dr. Sarah Johnson',
    priority: 'medium',
    tags: ['education', 'university', 'computer-science']
  },
  {
    id: '3',
    applicantName: 'Omar Khan',
    applicantEmail: 'omar@example.com',
    applicantPhone: '+1234567892',
    category: 'Business Support',
    title: 'Small Business Startup Loan',
    description: 'Financial assistance to start a small grocery business in local community.',
    requestedAmount: 10000,
    documents: [
      {
        id: '3',
        name: 'business-plan.pdf',
        type: 'application/pdf',
        size: 2048000,
        url: '#',
        uploadedAt: '2024-01-08T11:15:00Z'
      }
    ],
    status: 'submitted',
    submittedAt: '2024-01-08T11:00:00Z',
    priority: 'low',
    tags: ['business', 'startup', 'grocery']
  },
  {
    id: '4',
    applicantName: 'Aisha Mohammed',
    applicantEmail: 'aisha@example.com',
    applicantPhone: '+1234567893',
    category: 'Emergency Aid',
    title: 'Disaster Relief Support',
    description: 'Family displaced due to flood, need immediate shelter and basic necessities.',
    requestedAmount: 8000,
    documents: [
      {
        id: '4',
        name: 'damage-assessment.pdf',
        type: 'application/pdf',
        size: 1536000,
        url: '#',
        uploadedAt: '2024-01-07T16:45:00Z'
      }
    ],
    status: 'fulfilled',
    submittedAt: '2024-01-07T16:30:00Z',
    reviewedAt: '2024-01-08T09:00:00Z',
    reviewedBy: 'Mark Wilson',
    reviewComments: 'Urgent case processed immediately. Funds disbursed.',
    assignedReviewer: 'Mark Wilson',
    priority: 'urgent',
    tags: ['emergency', 'disaster', 'relief']
  },
  {
    id: '5',
    applicantName: 'Hassan Malik',
    applicantEmail: 'hassan@example.com',
    applicantPhone: '+1234567894',
    category: 'Medical Assistance',
    title: 'Diabetes Treatment Support',
    description: 'Monthly medication and treatment support for diabetes management.',
    requestedAmount: 5000,
    documents: [
      {
        id: '5',
        name: 'prescription.pdf',
        type: 'application/pdf',
        size: 768000,
        url: '#',
        uploadedAt: '2024-01-06T13:20:00Z'
      }
    ],
    status: 'rejected',
    submittedAt: '2024-01-06T13:00:00Z',
    reviewedAt: '2024-01-07T10:30:00Z',
    reviewedBy: 'Dr. Sarah Johnson',
    reviewComments: 'Incomplete documentation. Please provide updated medical records.',
    assignedReviewer: 'Dr. Sarah Johnson',
    priority: 'medium',
    tags: ['medical', 'diabetes', 'treatment']
  }
]

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@khidmat.com',
    name: 'System Administrator',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/4064840/pexels-photo-4064840.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-10T08:00:00Z',
    isActive: true,
  },
  {
    id: '2',
    email: 'sarah.johnson@khidmat.com',
    name: 'Dr. Sarah Johnson',
    role: 'senior_reviewer',
    avatar: 'https://images.pexels.com/photos/3767392/pexels-photo-3767392.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-10T07:45:00Z',
    isActive: true,
  },
  {
    id: '3',
    email: 'mark.wilson@khidmat.com',
    name: 'Mark Wilson',
    role: 'reviewer',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-02T00:00:00Z',
    lastLoginAt: '2024-01-09T18:30:00Z',
    isActive: true,
  },
  {
    id: '4',
    email: 'lisa.chen@khidmat.com',
    name: 'Lisa Chen',
    role: 'reviewer',
    avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-03T00:00:00Z',
    lastLoginAt: '2024-01-08T15:20:00Z',
    isActive: false,
  }
]

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Dr. Sarah Johnson',
    action: 'APPLICATION_APPROVED',
    resourceType: 'application',
    resourceId: '2',
    details: {
      applicationTitle: 'University Tuition Assistance',
      comments: 'Excellent academic record and strong potential.'
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: '2024-01-10T16:00:00Z'
  },
  {
    id: '2',
    userId: '1',
    userName: 'System Administrator',
    action: 'USER_CREATED',
    resourceType: 'user',
    resourceId: '4',
    details: {
      userEmail: 'lisa.chen@khidmat.com',
      userRole: 'reviewer'
    },
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (macOS; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    timestamp: '2024-01-10T14:30:00Z'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Mark Wilson',
    action: 'APPLICATION_FULFILLED',
    resourceType: 'application',
    resourceId: '4',
    details: {
      applicationTitle: 'Disaster Relief Support',
      amount: 8000
    },
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: '2024-01-10T12:15:00Z'
  },
  {
    id: '4',
    userId: '2',
    userName: 'Dr. Sarah Johnson',
    action: 'APPLICATION_REJECTED',
    resourceType: 'application',
    resourceId: '5',
    details: {
      applicationTitle: 'Diabetes Treatment Support',
      reason: 'Incomplete documentation'
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: '2024-01-07T10:30:00Z'
  },
  {
    id: '5',
    userId: '1',
    userName: 'System Administrator',
    action: 'LOGIN',
    resourceType: 'system',
    resourceId: 'auth',
    details: {
      loginMethod: 'email_password'
    },
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (macOS; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    timestamp: '2024-01-10T08:00:00Z'
  }
]