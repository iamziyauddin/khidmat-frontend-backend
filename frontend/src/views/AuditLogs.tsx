import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Download, RefreshCw, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AuditLogsTable } from '@/components/audit/AuditLogsTable'
import { mockAuditLogs } from '@/data/mockData'
import { AuditLog } from '@/types/audit'

export const AuditLogs: React.FC = () => {
  const [auditLogs] = useState<AuditLog[]>(mockAuditLogs)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAction, setSelectedAction] = useState('all')
  const [selectedResourceType, setSelectedResourceType] = useState('all')
  const [selectedUser, setSelectedUser] = useState('all')

  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const matchesSearch = 
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resourceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resourceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress.includes(searchTerm)

      const matchesAction = selectedAction === 'all' || log.action === selectedAction
      const matchesResourceType = selectedResourceType === 'all' || log.resourceType === selectedResourceType
      const matchesUser = selectedUser === 'all' || log.userId === selectedUser

      return matchesSearch && matchesAction && matchesResourceType && matchesUser
    })
  }, [auditLogs, searchTerm, selectedAction, selectedResourceType, selectedUser])

  const uniqueActions = Array.from(new Set(auditLogs.map(log => log.action)))
  const uniqueResourceTypes = Array.from(new Set(auditLogs.map(log => log.resourceType)))
  const uniqueUsers = Array.from(new Set(auditLogs.map(log => ({ id: log.userId, name: log.userName }))))

  const handleViewDetails = (log: AuditLog) => {
    console.log('Viewing audit log details:', log.id)
  }

  const handleRefresh = () => {
    console.log('Refreshing audit logs...')
  }

  const handleExport = () => {
    console.log('Exporting audit logs...')
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Logs</h1>
            <p className="text-gray-600">Monitor system activity and user actions</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action}>
                      {action.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedResourceType} onValueChange={setSelectedResourceType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Resources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resources</SelectItem>
                  {uniqueResourceTypes.map(resourceType => (
                    <SelectItem key={resourceType} value={resourceType}>
                      {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {filteredLogs.length} of {auditLogs.length} audit logs</span>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Last 30 days</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AuditLogsTable
          auditLogs={filteredLogs}
          onViewDetails={handleViewDetails}
        />
      </motion.div>
    </div>
  )
}