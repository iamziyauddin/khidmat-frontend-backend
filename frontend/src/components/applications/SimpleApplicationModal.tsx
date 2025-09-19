import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Application } from '@/types/application'

interface SimpleApplicationModalProps {
  application: Application | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SimpleApplicationModal: React.FC<SimpleApplicationModalProps> = ({
  application,
  open,
  onOpenChange
}) => {
  if (!application) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Application Details</DialogTitle>
          <DialogDescription>
            Application ID: {application.id}
          </DialogDescription>
        </DialogHeader>
        <DialogClose onClick={() => onOpenChange(false)} />
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{application.title}</h3>
            <p className="text-gray-600">{application.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Applicant:</label>
              <p>{application.applicantName}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email:</label>
              <p>{application.applicantEmail}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Amount:</label>
              <p>${application.requestedAmount.toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Status:</label>
              <Badge variant="outline">{application.status}</Badge>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}