import React from 'react'
import { motion } from 'framer-motion'
import { Eye, MoreVertical } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { mockApplications } from '@/data/mockData'
import { formatDate, getInitials } from '@/lib/utils'

interface RecentApplicationsProps {
  onNavigate?: (view: string) => void
}

export const RecentApplications: React.FC<RecentApplicationsProps> = ({ onNavigate }) => {
  const recentApplications = mockApplications.slice(0, 5)

  const handleViewAllClick = () => {
    if (onNavigate) {
      onNavigate('applications')
    }
  }

  const handleViewApplication = (applicationId: string) => {
    if (onNavigate) {
      // Navigate to applications view - in a more complex app, you might pass the application ID
      onNavigate('applications')
    }
  }

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

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Applications</CardTitle>
        <Button variant="outline" size="sm" onClick={handleViewAllClick}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentApplications.map((application, index) => (
              <motion.tr
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-gray-50"
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-teal-100 text-teal-700">
                        {getInitials(application.applicantName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{application.applicantName}</p>
                      <p className="text-xs text-gray-500">{application.applicantEmail}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm truncate max-w-[200px]">{application.title}</p>
                    <p className="text-xs text-gray-500">{application.category}</p>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  ${application.requestedAmount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(application.status)}>
                    {application.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {formatDate(application.submittedAt)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => handleViewApplication(application.id)}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}