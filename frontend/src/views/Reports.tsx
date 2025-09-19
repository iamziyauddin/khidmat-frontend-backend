import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Download, 
  Filter,
  FileText,
  PieChart,
  Activity,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockApplications, mockAuditLogs } from '@/data/mockData'
import { Application } from '@/types/application'

export const Reports: React.FC = () => {
  const [dateFilter, setDateFilter] = useState<string>('last30days')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  // Generate report data based on filters
  const reportData = useMemo(() => {
    const filteredApplications = mockApplications.filter((app: Application) => {
      if (statusFilter !== 'all' && app.status !== statusFilter) return false
      if (categoryFilter !== 'all' && app.category !== categoryFilter) return false
      return true
    })

    const statusCounts = {
      pending: filteredApplications.filter((app: Application) => app.status === 'pending').length,
      under_review: filteredApplications.filter((app: Application) => app.status === 'under_review').length,
      approved: filteredApplications.filter((app: Application) => app.status === 'approved').length,
      rejected: filteredApplications.filter((app: Application) => app.status === 'rejected').length,
      fulfilled: filteredApplications.filter((app: Application) => app.status === 'fulfilled').length
    }

    const categoryCounts = filteredApplications.reduce((acc: Record<string, number>, app: Application) => {
      acc[app.category] = (acc[app.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const totalRequested = filteredApplications.reduce((sum: number, app: Application) => sum + app.requestedAmount, 0)
    const averageAmount = filteredApplications.length > 0 ? totalRequested / filteredApplications.length : 0

    return {
      totalApplications: filteredApplications.length,
      statusCounts,
      categoryCounts,
      totalRequested,
      averageAmount,
      recentActivity: mockAuditLogs.slice(0, 5)
    }
  }, [statusFilter, categoryFilter])

  const handleExportReport = (format: 'csv' | 'pdf') => {
    if (format === 'csv') {
      const csvData = mockApplications.map((app: Application) => ({
        ID: app.id,
        'Applicant Name': app.applicantName,
        'Email': app.applicantEmail,
        'Category': app.category,
        'Status': app.status,
        'Requested Amount': app.requestedAmount,
        'Submitted Date': app.submittedAt,
        'Reviewer': app.assignedReviewer || 'Unassigned'
      }))

      const headers = Object.keys(csvData[0]).join(',')
      const rows = csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
      const csvContent = [headers, ...rows].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `applications-report-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } else {
      // For PDF, we'll create a simple text-based report
      const reportContent = `
KHIDMAT APPLICATIONS REPORT
Generated: ${new Date().toLocaleDateString()}

SUMMARY STATISTICS:
- Total Applications: ${reportData.totalApplications}
- Total Requested Amount: $${reportData.totalRequested.toLocaleString()}
- Average Request: $${Math.round(reportData.averageAmount).toLocaleString()}

STATUS BREAKDOWN:
- Pending: ${reportData.statusCounts.pending}
- Under Review: ${reportData.statusCounts.under_review}
- Approved: ${reportData.statusCounts.approved}
- Rejected: ${reportData.statusCounts.rejected}
- Fulfilled: ${reportData.statusCounts.fulfilled}

CATEGORY BREAKDOWN:
${Object.entries(reportData.categoryCounts).map(([cat, count]) => `- ${cat}: ${count}`).join('\n')}
      `

      const blob = new Blob([reportContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `applications-report-${new Date().toISOString().split('T')[0]}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

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

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Report Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="last90days">Last 90 Days</SelectItem>
                    <SelectItem value="lastyear">Last Year</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="fulfilled">Fulfilled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Medical Assistance">Medical Assistance</SelectItem>
                    <SelectItem value="Education Support">Education Support</SelectItem>
                    <SelectItem value="Housing Support">Housing Support</SelectItem>
                    <SelectItem value="Disaster Relief">Disaster Relief</SelectItem>
                    <SelectItem value="Emergency Support">Emergency Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button 
                  onClick={() => handleExportReport('csv')}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
                <Button 
                  onClick={() => handleExportReport('pdf')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export TXT
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Total Applications',
            value: reportData.totalApplications.toString(),
            icon: <FileText className="h-6 w-6 text-white" />,
            color: 'bg-blue-500'
          },
          {
            title: 'Total Requested',
            value: `$${reportData.totalRequested.toLocaleString()}`,
            icon: <TrendingUp className="h-6 w-6 text-white" />,
            color: 'bg-green-500'
          },
          {
            title: 'Approved',
            value: reportData.statusCounts.approved.toString(),
            icon: <CheckCircle className="h-6 w-6 text-white" />,
            color: 'bg-emerald-500'
          },
          {
            title: 'Pending Review',
            value: reportData.statusCounts.under_review.toString(),
            icon: <Clock className="h-6 w-6 text-white" />,
            color: 'bg-orange-500'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Report Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(reportData.statusCounts).map(([status, count]) => {
                  const percentage = reportData.totalApplications > 0 
                    ? (count / reportData.totalApplications * 100).toFixed(1)
                    : '0'
                  const colors = {
                    pending: 'bg-yellow-500',
                    under_review: 'bg-blue-500',
                    approved: 'bg-green-500',
                    rejected: 'bg-red-500',
                    fulfilled: 'bg-purple-500'
                  }
                  
                  return (
                    <div key={status} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${colors[status as keyof typeof colors]}`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium capitalize">{status.replace('_', ' ')}</span>
                          <span className="text-sm text-gray-600">{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${colors[status as keyof typeof colors]}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(reportData.categoryCounts).map(([category, count]) => {
                  const percentage = reportData.totalApplications > 0 
                    ? (count / reportData.totalApplications * 100).toFixed(1)
                    : '0'
                  
                  return (
                    <div key={category} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{category}</span>
                          <span className="text-sm text-gray-600">{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="h-2 rounded-full bg-indigo-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent System Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.recentActivity.map((log) => (
                <div key={log.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    {log.action.includes('APPROVED') && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {log.action.includes('REJECTED') && <XCircle className="h-5 w-5 text-red-500" />}
                    {log.action.includes('USER') && <Users className="h-5 w-5 text-blue-500" />}
                    {log.action.includes('LOGIN') && <Activity className="h-5 w-5 text-gray-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{log.action.replace('_', ' ')}</p>
                    <p className="text-xs text-gray-600">by {log.userName}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}