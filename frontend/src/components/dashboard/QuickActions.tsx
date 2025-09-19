import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Users, Clock, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface QuickActionsProps {
  onNavigate?: (view: string) => void
}

const quickActions = [
  {
    id: '1',
    title: 'Pending Reviews',
    count: 8,
    description: 'Applications awaiting review',
    icon: Clock,
    color: 'bg-blue-50 text-blue-600',
    action: 'Review Now',
    targetView: 'applications'
  },
  {
    id: '2',
    title: 'High Priority',
    count: 3,
    description: 'Urgent applications',
    icon: TrendingUp,
    color: 'bg-red-50 text-red-600',
    action: 'View All',
    targetView: 'applications'
  },
  {
    id: '3',
    title: 'New Applications',
    count: 15,
    description: 'Submitted today',
    icon: FileText,
    color: 'bg-green-50 text-green-600',
    action: 'Process',
    targetView: 'applications'
  },
  {
    id: '4',
    title: 'Active Reviewers',
    count: 12,
    description: 'Currently online',
    icon: Users,
    color: 'bg-purple-50 text-purple-600',
    action: 'Manage',
    targetView: 'users'
  }
]

export const QuickActions: React.FC<QuickActionsProps> = ({ onNavigate }) => {
  const handleActionClick = (targetView: string) => {
    if (onNavigate) {
      onNavigate(targetView)
    }
  }
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary">{action.count}</Badge>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleActionClick(action.targetView)}
                >
                  {action.action}
                </Button>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}