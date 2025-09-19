import React from 'react'
import {
  X,
  User,
  Globe,
  Clock,
  Monitor,
  Smartphone,
  Activity,
  Info,
  FileText,
  Database,
  Settings
} from 'lucide-react'
import { AuditLog } from '@/types/audit'

interface AuditLogDetailModalProps {
  auditLog: AuditLog | null
  open: boolean
  onClose: () => void
}

export const AuditLogDetailModal: React.FC<AuditLogDetailModalProps> = ({
  auditLog,
  open,
  onClose
}) => {
  if (!open || !auditLog) return null

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'login':
        return <User className="h-5 w-5 text-blue-500" />
      case 'application_approved':
      case 'application_rejected':
      case 'application_fulfilled':
        return <FileText className="h-5 w-5 text-green-500" />
      case 'user_created':
      case 'user_updated':
        return <User className="h-5 w-5 text-purple-500" />
      case 'system_backup':
      case 'system_maintenance':
        return <Database className="h-5 w-5 text-orange-500" />
      default:
        return <Activity className="h-5 w-5 text-gray-500" />
    }
  }

  const getResourceIcon = (resourceType: string) => {
    switch (resourceType) {
      case 'application':
        return <FileText className="h-4 w-4 text-blue-500" />
      case 'user':
        return <User className="h-4 w-4 text-green-500" />
      case 'system':
        return <Settings className="h-4 w-4 text-purple-500" />
      default:
        return <Database className="h-4 w-4 text-gray-500" />
    }
  }

  const getUserAgentInfo = (userAgent: string) => {
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent)
    const browser = userAgent.includes('Chrome') ? 'Chrome' :
                   userAgent.includes('Firefox') ? 'Firefox' :
                   userAgent.includes('Safari') ? 'Safari' : 'Unknown'
    return { isMobile, browser }
  }

  const userAgentInfo = getUserAgentInfo(auditLog.userAgent)

  const formatAction = (action: string) => {
    return action.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    })
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxWidth: '56rem',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6 pb-4 border-b">
            <div className="flex items-center space-x-3">
              {getActionIcon(auditLog.action)}
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {formatAction(auditLog.action)}
                </h2>
                <p className="text-sm text-gray-500">Audit Log Details</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
              type="button"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Basic Information */}
            <div className="space-y-4">
              {/* Timestamp */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Timestamp
                </h3>
                <p className="text-sm text-gray-700 font-mono">
                  {formatDateTime(auditLog.timestamp)}
                </p>
              </div>

              {/* User Information */}
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  User Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</label>
                    <p className="text-sm text-gray-900">{auditLog.userName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">User ID</label>
                    <p className="text-sm text-gray-900 font-mono">{auditLog.userId}</p>
                  </div>
                </div>
              </div>

              {/* Resource Information */}
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  {getResourceIcon(auditLog.resourceType)}
                  <span className="ml-2">Resource Information</span>
                </h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Type</label>
                    <p className="text-sm text-gray-900 capitalize">{auditLog.resourceType}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Resource ID</label>
                    <p className="text-sm text-gray-900 font-mono">{auditLog.resourceId}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Technical Details */}
            <div className="space-y-4">
              {/* Network Information */}
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Network Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">IP Address</label>
                    <p className="text-sm text-gray-900 font-mono">{auditLog.ipAddress}</p>
                  </div>
                </div>
              </div>

              {/* Browser Information */}
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  {userAgentInfo.isMobile ? 
                    <Smartphone className="h-4 w-4 mr-2" /> : 
                    <Monitor className="h-4 w-4 mr-2" />
                  }
                  Device Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Device Type</label>
                    <p className="text-sm text-gray-900">
                      {userAgentInfo.isMobile ? 'Mobile Device' : 'Desktop/Laptop'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Browser</label>
                    <p className="text-sm text-gray-900">{userAgentInfo.browser}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">User Agent</label>
                    <p className="text-xs text-gray-600 font-mono break-all">{auditLog.userAgent}</p>
                  </div>
                </div>
              </div>

              {/* Action Details */}
              {Object.keys(auditLog.details).length > 0 && (
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Action Details
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(auditLog.details).map(([key, value], index) => (
                      <div key={index}>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </label>
                        <p className="text-sm text-gray-900">
                          {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}