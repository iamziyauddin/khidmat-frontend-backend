export interface Application {
  id: string
  applicantName: string
  applicantEmail: string
  applicantPhone: string
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
  type: string
  size: number
  url: string
  uploadedAt: string
}

export interface StatusTransition {
  from: Application['status']
  to: Application['status']
  timestamp: string
  userId: string
  userName: string
  comments?: string
}