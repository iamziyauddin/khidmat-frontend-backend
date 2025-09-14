import React from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Book, MessageSquare, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Help: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">Get assistance and find resources to help you use the system effectively</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: 'Documentation',
            icon: <Book className="h-8 w-8 text-blue-600" />,
            description: 'Complete user guides and system documentation'
          },
          {
            title: 'FAQ',
            icon: <HelpCircle className="h-8 w-8 text-green-600" />,
            description: 'Frequently asked questions and quick answers'
          },
          {
            title: 'Live Chat',
            icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
            description: 'Chat with our support team for immediate assistance'
          },
          {
            title: 'Contact Support',
            icon: <Phone className="h-8 w-8 text-orange-600" />,
            description: 'Reach out to our support team via phone or email'
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
                <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  {item.icon}
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}