import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign,
  TrendingUp
} from 'lucide-react'
import { KPICard } from '@/components/dashboard/KPICard'
import { StatusChart } from '@/components/dashboard/StatusChart'
import { ActivityTimeline } from '@/components/dashboard/ActivityTimeline'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { RecentApplications } from '@/components/dashboard/RecentApplications'

interface DashboardProps {
  onNavigate?: (view: string) => void
}

const kpiData = [
  {
    title: 'Total Applications',
    value: '1,247',
    change: 12.5,
    trend: 'up' as const,
    icon: <FileText className="h-6 w-6 text-white" />,
    color: 'bg-blue-500'
  },
  {
    title: 'Pending Review',
    value: '23',
    change: -5.2,
    trend: 'down' as const,
    icon: <Clock className="h-6 w-6 text-white" />,
    color: 'bg-orange-500'
  },
  {
    title: 'Approved',
    value: '892',
    change: 8.1,
    trend: 'up' as const,
    icon: <CheckCircle className="h-6 w-6 text-white" />,
    color: 'bg-green-500'
  },
  {
    title: 'Success Rate',
    value: '94.2%',
    change: 2.3,
    trend: 'up' as const,
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    color: 'bg-purple-500'
  },
  {
    title: 'Total Disbursed',
    value: '$2.4M',
    change: 15.8,
    trend: 'up' as const,
    icon: <DollarSign className="h-6 w-6 text-white" />,
    color: 'bg-teal-500'
  }
]

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to Khidmat CMS Bridge System</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <KPICard {...kpi} />
          </motion.div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <StatusChart />
        <ActivityTimeline />
      </div>

      {/* Quick Actions and Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <QuickActions onNavigate={onNavigate} />
        <RecentApplications onNavigate={onNavigate} />
      </div>
    </div>
  )
}