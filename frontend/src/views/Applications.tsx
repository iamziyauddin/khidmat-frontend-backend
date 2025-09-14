import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ApplicationFilters } from '@/components/applications/ApplicationFilters'
import { ApplicationsTable } from '@/components/applications/ApplicationsTable'
import { mockApplications } from '@/data/mockData'
import { Application } from '@/types/application'

export const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = 
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicantEmail.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus
      const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory
      const matchesPriority = selectedPriority === 'all' || app.priority === selectedPriority

      return matchesSearch && matchesStatus && matchesCategory && matchesPriority
    })
  }, [applications, searchTerm, selectedStatus, selectedCategory, selectedPriority])

  const handleStatusChange = (applicationId: string, newStatus: Application['status']) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { 
            ...app, 
            status: newStatus, 
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'Current User'  // In real app, this would be the current user
          }
        : app
    ))
  }

  const handleBulkStatusChange = (newStatus: Application['status']) => {
    setApplications(prev => prev.map(app => 
      selectedApplications.includes(app.id)
        ? { 
            ...app, 
            status: newStatus, 
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'Current User'
          }
        : app
    ))
    setSelectedApplications([])
  }

  const handleViewApplication = (application: Application) => {
    // In a real app, this would open a modal or navigate to a detail page
    console.log('Viewing application:', application.id)
  }

  const handleRefresh = () => {
    // In a real app, this would fetch fresh data from the API
    console.log('Refreshing applications...')
  }

  const handleExport = () => {
    // In a real app, this would export the filtered data
    console.log('Exporting applications...')
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications</h1>
            <p className="text-gray-600">Manage and review application submissions</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>

        {/* Bulk Actions */}
        {selectedApplications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-800">
                {selectedApplications.length} application{selectedApplications.length > 1 ? 's' : ''} selected
              </p>
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkStatusChange('approved')}
                  className="text-green-600 border-green-300 hover:bg-green-50"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve All
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkStatusChange('rejected')}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject All
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkStatusChange('under_review')}
                  className="text-blue-600 border-blue-300 hover:bg-blue-50"
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Mark Under Review
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="space-y-6">
        <ApplicationFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          onRefresh={handleRefresh}
          onExport={handleExport}
          totalCount={filteredApplications.length}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ApplicationsTable
            applications={filteredApplications}
            selectedApplications={selectedApplications}
            onSelectionChange={setSelectedApplications}
            onViewApplication={handleViewApplication}
            onStatusChange={handleStatusChange}
          />
        </motion.div>
      </div>
    </div>
  )
}