import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { LoginForm } from '@/components/auth/LoginForm'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Dashboard } from '@/views/Dashboard'
import { Applications } from '@/views/Applications'
import { Users } from '@/views/Users'
import { AuditLogs } from '@/views/AuditLogs'
import { Reports } from '@/views/Reports'
import { Settings } from '@/views/Settings'
import { Help } from '@/views/Help'

const queryClient = new QueryClient()

const AppContent: React.FC = () => {
  const { user } = useAuth()
  const [activeView, setActiveView] = useState('dashboard')

  if (!user) {
    return <LoginForm />
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'applications':
        return <Applications />
      case 'users':
        return <Users />
      case 'audit':
        return <AuditLogs />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      case 'help':
        return <Help />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App