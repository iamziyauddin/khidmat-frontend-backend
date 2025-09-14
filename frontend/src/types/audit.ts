export interface AuditLog {
  id: string
  userId: string
  userName: string
  action: string
  resourceType: 'application' | 'user' | 'system'
  resourceId: string
  details: Record<string, any>
  ipAddress: string
  userAgent: string
  timestamp: string
}