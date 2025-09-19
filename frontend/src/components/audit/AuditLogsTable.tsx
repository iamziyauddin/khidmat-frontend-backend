import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Download, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AuditLog } from '@/types/audit'
import { formatDateTime } from '@/lib/utils'

interface AuditLogsTableProps {
  auditLogs: AuditLog[]
  onViewDetails: (log: AuditLog) => void
  onDownloadLog?: (log: AuditLog) => void
}

export const AuditLogsTable: React.FC<AuditLogsTableProps> = ({
  auditLogs,
  onViewDetails,
  onDownloadLog
}) => {
  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'login':
        return 'bg-blue-100 text-blue-800'
      case 'application_approved':
        return 'bg-green-100 text-green-800'
      case 'application_rejected':
        return 'bg-red-100 text-red-800'
      case 'application_fulfilled':
        return 'bg-purple-100 text-purple-800'
      case 'user_created':
        return 'bg-indigo-100 text-indigo-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatAction = (action: string) => {
    return action.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const getResourceTypeColor = (resourceType: string) => {
    switch (resourceType) {
      case 'application':
        return 'text-blue-600'
      case 'user':
        return 'text-green-600'
      case 'system':
        return 'text-purple-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Resource</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditLogs.map((log, index) => (
            <motion.tr
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-gray-50"
            >
              <TableCell className="font-mono text-sm">
                {formatDateTime(log.timestamp)}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-sm">{log.userName}</p>
                  <p className="text-xs text-gray-500">ID: {log.userId}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getActionColor(log.action)}>
                  {formatAction(log.action)}
                </Badge>
              </TableCell>
              <TableCell>
                <div>
                  <p className={`text-sm font-medium ${getResourceTypeColor(log.resourceType)}`}>
                    {log.resourceType}
                  </p>
                  <p className="text-xs text-gray-500 font-mono">{log.resourceId}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[200px]">
                  {Object.entries(log.details).map(([key, value], i) => (
                    <p key={i} className="text-xs text-gray-600 truncate">
                      <span className="font-medium">{key}:</span> {String(value)}
                    </p>
                  ))}
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm text-gray-600">
                {log.ipAddress}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onViewDetails(log)}
                    title="View audit log details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onDownloadLog && onDownloadLog(log)}
                    title="Download audit log"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}