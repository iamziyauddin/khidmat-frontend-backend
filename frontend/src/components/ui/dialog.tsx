import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './button'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

interface DialogHeaderProps {
  children: React.ReactNode
}

interface DialogTitleProps {
  children: React.ReactNode
}

interface DialogDescriptionProps {
  children: React.ReactNode
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => onOpenChange(false)}
          />
          <div className="relative z-50 w-full max-w-lg">
            {children}
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export const DialogContent: React.FC<DialogContentProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2 }}
      className={`relative w-full max-h-[85vh] overflow-auto rounded-lg bg-white p-6 shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  )
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  return (
    <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
      {children}
    </div>
  )
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
  return (
    <h2 className="text-lg font-semibold leading-none tracking-tight text-gray-900">
      {children}
    </h2>
  )
}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ children }) => {
  return (
    <p className="text-sm text-gray-500">
      {children}
    </p>
  )
}

interface DialogCloseProps {
  onClick: () => void
}

export const DialogClose: React.FC<DialogCloseProps> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none"
      onClick={onClick}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </Button>
  )
}