import React from 'react'
import { motion } from 'framer-motion'
import { Settings2, Bell, Shield, Database } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Settings: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure system preferences and security settings</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: 'System Configuration',
            icon: <Settings2 className="h-8 w-8 text-gray-600" />,
            description: 'General system settings and preferences'
          },
          {
            title: 'Notifications',
            icon: <Bell className="h-8 w-8 text-blue-600" />,
            description: 'Email and alert notification settings'
          },
          {
            title: 'Security & Access',
            icon: <Shield className="h-8 w-8 text-red-600" />,
            description: 'Security policies and access controls'
          },
          {
            title: 'Data Management',
            icon: <Database className="h-8 w-8 text-green-600" />,
            description: 'Database backup and data retention settings'
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