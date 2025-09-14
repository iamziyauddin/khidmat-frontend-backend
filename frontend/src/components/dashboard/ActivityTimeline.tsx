import React from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, XCircle, AlertCircle, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/lib/utils'

const activities = [
  {
    id: '1',
    type: 'approved',
    title: 'Application Approved',
    description: 'University Tuition Assistance - Fatima Ali',
    user: 'Dr. Sarah Johnson',
    timestamp: '2024-01-10T16:00:00Z',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    id: '2',
    type: 'review',
    title: 'Under Review',
    description: 'Emergency Heart Surgery - Ahmed Hassan',
    user: 'Dr. Sarah Johnson',
    timestamp: '2024-01-10T14:30:00Z',
    icon: AlertCircle,
    color: 'text-blue-600'
  },
  {
    id: '3',
    type: 'rejected',
    title: 'Application Rejected',
    description: 'Diabetes Treatment Support - Hassan Malik',
    user: 'Dr. Sarah Johnson',
    timestamp: '2024-01-07T10:30:00Z',
    icon: XCircle,
    color: 'text-red-600'
  },
  {
    id: '4',
    type: 'submitted',
    title: 'New Application',
    description: 'Small Business Startup Loan - Omar Khan',
    user: 'System',
    timestamp: '2024-01-08T11:00:00Z',
    icon: Clock,
    color: 'text-gray-600'
  }
]

export const ActivityTimeline: React.FC = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 relative"
              >
                {index !== activities.length - 1 && (
                  <div className="absolute left-4 top-8 h-8 w-px bg-gray-200" />
                )}
                <div className={`flex-shrink-0 p-1.5 rounded-full bg-white border-2 border-gray-200`}>
                  <Icon className={`h-3 w-3 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {formatDateTime(activity.timestamp)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-1">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{activity.user}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}