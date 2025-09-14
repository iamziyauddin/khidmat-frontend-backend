import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Eye, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  Calendar,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Application } from '@/types/application'
import { formatDate, formatDateTime, getInitials } from '@/lib/utils'

interface ApplicationsTableProps {
  applications: Application[]
  selectedApplications: string[]
  onSelectionChange: (selectedIds: string[]) => void
  onViewApplication: (application: Application) => void
  onStatusChange: (applicationId: string, status: Application['status']) => void
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  selectedApplications,
  onSelectionChange,
  onViewApplication,
  onStatusChange
}) => {
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
        return 'text-red-600'
      case 'high':
        return 'text-orange-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="h-4 w-4" />
      case 'high':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(applications.map(app => app.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectApplication = (applicationId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedApplications, applicationId])
    } else {
      onSelectionChange(selectedApplications.filter(id => id !== applicationId))
    }
  }

  const isAllSelected = applications.length > 0 && selectedApplications.length === applications.length
  const isPartiallySelected = selectedApplications.length > 0 && selectedApplications.length < applications.length

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={isAllSelected}
                indeterminate={isPartiallySelected}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Applicant</TableHead>
            <TableHead>Application</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Reviewer</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application, index) => (
            <motion.tr
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-gray-50"
            >
              <TableCell>
                <Checkbox
                  checked={selectedApplications.includes(application.id)}
                  onCheckedChange={(checked) => handleSelectApplication(application.id, checked as boolean)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-teal-100 text-teal-700">
                      {getInitials(application.applicantName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{application.applicantName}</p>
                    <p className="text-xs text-gray-500">{application.applicantEmail}</p>
                    <p className="text-xs text-gray-500">{application.applicantPhone}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[250px]">
                  <p className="font-medium text-sm truncate" title={application.title}>
                    {application.title}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">{application.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {application.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                        {tag}
                      </Badge>
                    ))}
                    {application.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        +{application.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="font-semibold text-sm">
                  ${application.requestedAmount.toLocaleString()}
                </p>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <FileText className="h-3 w-3" />
                  <span>{application.documents.length} docs</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(application.status)}>
                  {application.status.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className={`flex items-center space-x-1 ${getPriorityColor(application.priority)}`}>
                  {getPriorityIcon(application.priority)}
                  <span className="text-sm font-medium capitalize">
                    {application.priority}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(application.submittedAt)}</span>
                </div>
                <p className="text-xs text-gray-500">
                  {formatDateTime(application.submittedAt)}
                </p>
              </TableCell>
              <TableCell>
                {application.assignedReviewer ? (
                  <div className="flex items-center space-x-1 text-sm">
                    <User className="h-3 w-3 text-gray-400" />
                    <span className="truncate max-w-[100px]" title={application.assignedReviewer}>
                      {application.assignedReviewer}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">Unassigned</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onViewApplication(application)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewApplication(application)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onStatusChange(application.id, 'approved')}
                        className="text-green-600"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onStatusChange(application.id, 'rejected')}
                        className="text-red-600"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onStatusChange(application.id, 'under_review')}>
                        <Clock className="mr-2 h-4 w-4" />
                        Mark Under Review
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}