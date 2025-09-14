import React from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  FileText, 
  Users, 
  Shield, 
  Settings, 
  HelpCircle,
  Activity,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'applications', label: 'Applications', icon: FileText },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'audit', label: 'Audit Logs', icon: Shield },
  { id: 'reports', label: 'Reports', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
]

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full">
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            
            return (
              <li key={item.id}>
                <motion.button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors group",
                    isActive
                      ? "bg-teal-50 text-teal-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={cn(
                      "h-5 w-5",
                      isActive ? "text-teal-600" : "text-gray-500 group-hover:text-gray-700"
                    )} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    isActive ? "text-teal-600 rotate-90" : "text-gray-400 opacity-0 group-hover:opacity-100"
                  )} />
                </motion.button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}