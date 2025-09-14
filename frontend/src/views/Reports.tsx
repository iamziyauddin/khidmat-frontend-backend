import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Reports: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Comprehensive insights and performance metrics</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Performance Metrics',
            icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
            description: 'Application processing performance and trends'
          },
          {
            title: 'User Activity',
            icon: <Users className="h-8 w-8 text-green-600" />,
            description: 'Reviewer productivity and engagement metrics'
          },
          {
            title: 'Trend Analysis',
            icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
            description: 'Historical data trends and predictions'
          },
          {
            title: 'Time Reports',
            icon: <Calendar className="h-8 w-8 text-orange-600" />,
            description: 'Time-based analysis and scheduling insights'
          }
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  {item.icon}
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}