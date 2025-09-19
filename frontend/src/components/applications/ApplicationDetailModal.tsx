import React from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  DollarSign,
  Tag,
  Clock,
  AlertTriangle,
  MapPin,
  Briefcase,
  Building,
  CheckCircle,
  XCircle,
  Download,
  ExternalLink
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Application } from '@/types/application'
import { formatDate, formatDateTime, getInitials } from '@/lib/utils'

interface ApplicationDetailModalProps {
  application: Application | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange?: (applicationId: string, status: Application['status']) => void
}

export const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({
  application,
  open,
  onOpenChange,
  onStatusChange
}) => {
  if (!application) return null

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'submitted'
      case 'under_review':
        return 'under_review'
      case 'approved':
        return 'approved'
      case 'rejected':
        return 'rejected'
      case 'fulfilled':
        return 'fulfilled'
      default:
        return 'default'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-50'
      case 'high':
        return 'text-orange-600 bg-orange-50'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50'
      case 'low':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const handleStatusUpdate = (newStatus: Application['status']) => {
    if (onStatusChange) {
      onStatusChange(application.id, newStatus)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Application Details</span>
            <Badge variant={getStatusVariant(application.status)}>
              {application.status.replace('_', ' ')}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Application ID: {application.id} • Submitted {formatDate(application.submittedAt)}
          </DialogDescription>
        </DialogHeader>
        <DialogClose onClick={() => onOpenChange(false)} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Applicant Info */}
          <div className="lg:col-span-1 space-y-4">
            {/* Applicant Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Applicant Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-sm">
                      {getInitials(application.applicantName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{application.applicantName}</p>
                    <p className="text-sm text-gray-500">Applicant</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{application.applicantEmail}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{application.applicantPhone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{application.applicantAddress}</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center text-sm mb-1">
                    <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Profession:</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{application.applicantProfession}</p>
                </div>

                <div>
                  <div className="flex items-center text-sm mb-1">
                    <Building className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Organization:</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{application.applicantOrganization}</p>
                </div>
              </CardContent>
            </Card>

            {/* Priority & Assignment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Priority & Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium ${getPriorityColor(application.priority)}`}>
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {application.priority.toUpperCase()} Priority
                </div>
                
                {application.assignedReviewer && (
                  <div>
                    <p className="text-sm font-medium">Assigned Reviewer:</p>
                    <p className="text-sm text-gray-600">{application.assignedReviewer}</p>
                  </div>
                )}

                {application.reviewedAt && (
                  <div>
                    <p className="text-sm font-medium">Reviewed:</p>
                    <p className="text-sm text-gray-600">{formatDateTime(application.reviewedAt)}</p>
                    {application.reviewedBy && (
                      <p className="text-xs text-gray-500">by {application.reviewedBy}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Application Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Application Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Application Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{application.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{application.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Category:</p>
                    <Badge variant="outline">{application.category}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Requested Amount:</p>
                    <div className="flex items-center text-lg font-semibold text-green-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {application.requestedAmount.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {application.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Submission Date:</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDateTime(application.submittedAt)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Supporting Documents ({application.documents.length})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {application.documents.length > 0 ? (
                  <div className="space-y-2">
                    {application.documents.map((doc, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{doc}</p>
                            <p className="text-xs text-gray-500">PDF Document</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No documents uploaded</p>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            {onStatusChange && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Review Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={() => handleStatusUpdate('approved')}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={application.status === 'approved'}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      onClick={() => handleStatusUpdate('rejected')}
                      variant="outline"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                      disabled={application.status === 'rejected'}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      onClick={() => handleStatusUpdate('under_review')}
                      variant="outline"
                      className="text-blue-600 border-blue-300 hover:bg-blue-50"
                      disabled={application.status === 'under_review'}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Mark Under Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}