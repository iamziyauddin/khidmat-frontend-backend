export interface Application {
  id: string
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  applicantAddress?: string
  applicantProfession?: string
  applicantOrganization?: string
  applicantPhoto?: string // URL to applicant's photo
  category: string
  title: string
  description: string
  requestedAmount: number
  documents: Document[]
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'fulfilled'
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  reviewComments?: string
  assignedReviewer?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  tags: string[]
}

export interface Document {
  id: string
  name: string
  type: string // MIME type (e.g., 'image/jpeg', 'application/pdf', 'image/png')
  category: 'photo' | 'identity' | 'medical' | 'financial' | 'education' | 'business' | 'other'
  size: number
  url: string
  uploadedAt: string
  thumbnail?: string // URL to thumbnail for images
}

export interface StatusTransition {
  from: Application['status']
  to: Application['status']
  timestamp: string
  userId: string
  userName: string
  comments?: string
}