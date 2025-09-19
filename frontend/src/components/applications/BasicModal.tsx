import React from 'react'
import { 
  X, 
  FileText, 
  Image, 
  CreditCard, 
  Heart, 
  GraduationCap, 
  Briefcase, 
  Download, 
  Eye,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar
} from 'lucide-react'

interface BasicModalProps {
  application: any | null
  open: boolean
  onClose: () => void
}

export const BasicModal: React.FC<BasicModalProps> = ({
  application,
  open,
  onClose
}) => {
  console.log('BasicModal render:', { open, hasApplication: !!application })
  
  if (!open || !application) {
    console.log('BasicModal not rendering because:', { open, hasApplication: !!application })
    return null
  }

  console.log('BasicModal rendering with application:', application.title)

  // Helper function to get file type icon
  const getFileIcon = (type: string, category: string) => {
    if (type.startsWith('image/')) {
      return <Image className="h-5 w-5 text-blue-500" />
    }
    
    switch (category) {
      case 'identity':
        return <CreditCard className="h-5 w-5 text-purple-500" />
      case 'medical':
        return <Heart className="h-5 w-5 text-red-500" />
      case 'education':
        return <GraduationCap className="h-5 w-5 text-green-500" />
      case 'business':
      case 'financial':
        return <Briefcase className="h-5 w-5 text-orange-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  // Helper function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Helper function to get document category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'photo':
        return 'bg-blue-100 text-blue-800'
      case 'identity':
        return 'bg-purple-100 text-purple-800'
      case 'medical':
        return 'bg-red-100 text-red-800'
      case 'education':
        return 'bg-green-100 text-green-800'
      case 'financial':
      case 'business':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
        className="bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxWidth: '72rem',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6 pb-4 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{application.title}</h2>
              <p className="text-sm text-gray-500 mt-1">Application ID: {application.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
              type="button"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Applicant Info with Photo */}
            <div className="lg:col-span-1 space-y-4">
              {/* Applicant Photo */}
              {application.applicantPhoto && (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <img 
                    src={application.applicantPhoto} 
                    alt={application.applicantName}
                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(application.applicantName)}&size=96&background=0ea5e9&color=fff`
                    }}
                  />
                  <h3 className="font-semibold text-lg text-gray-900">{application.applicantName}</h3>
                  <p className="text-sm text-gray-600">{application.applicantProfession || 'Applicant'}</p>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Contact Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{application.applicantEmail}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{application.applicantPhone}</span>
                  </div>
                  {application.applicantAddress && (
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                      <span>{application.applicantAddress}</span>
                    </div>
                  )}
                  {application.applicantOrganization && (
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{application.applicantOrganization}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status & Priority */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Application Status</h4>
                <div className="space-y-2">
                  <div>
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                      application.status === 'approved' ? 'bg-green-100 text-green-800' :
                      application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      application.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {application.status?.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    Submitted: {new Date(application.submittedAt).toLocaleDateString()}
                  </div>
                  {application.assignedReviewer && (
                    <div className="text-sm">
                      <span className="text-gray-600">Reviewer: </span>
                      <span className="font-medium">{application.assignedReviewer}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Application Details & Documents */}
            <div className="lg:col-span-2 space-y-4">
              {/* Application Details */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Application Details</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 leading-relaxed">{application.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <span className="inline-block px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                        {application.category}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Requested Amount</label>
                      <p className="text-xl font-bold text-green-600">
                        ${application.requestedAmount?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {application.tags && application.tags.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                      <div className="flex flex-wrap gap-1">
                        {application.tags.map((tag: string, index: number) => (
                          <span 
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents Section */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Supporting Documents ({application.documents?.length || 0})
                </h4>
                
                {application.documents && application.documents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {application.documents.map((doc: any, index: number) => (
                      <div 
                        key={index}
                        className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            {getFileIcon(doc.type, doc.category)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {doc.name}
                              </p>
                              {doc.category && (
                                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getCategoryColor(doc.category)}`}>
                                  {doc.category}
                                </span>
                              )}
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-1">
                              {formatFileSize(doc.size)} • {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                            
                            {/* Show thumbnail for images */}
                            {doc.type?.startsWith('image/') && doc.thumbnail && (
                              <div className="mt-2">
                                <img 
                                  src={doc.thumbnail || doc.url} 
                                  alt={doc.name}
                                  className="w-16 h-16 object-cover rounded border"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                  }}
                                />
                              </div>
                            )}
                            
                            <div className="flex items-center space-x-2 mt-2">
                              <button 
                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                                onClick={() => window.open(doc.url, '_blank')}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </button>
                              <button 
                                className="text-xs text-green-600 hover:text-green-800 flex items-center"
                                onClick={() => {
                                  // In a real app, this would trigger download
                                  console.log('Download:', doc.name)
                                }}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No documents uploaded</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  type="button"
                >
                  Close
                </button>
                <button 
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  type="button"
                >
                  Take Action
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}