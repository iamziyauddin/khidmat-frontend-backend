import React from 'react'

interface TestModalProps {
  open: boolean
  onClose: () => void
}

export const TestModal: React.FC<TestModalProps> = ({ open, onClose }) => {
  console.log('TestModal render:', { open })
  
  if (!open) return null

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '90%'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>Test Modal</h2>
        <p style={{ margin: '0 0 1rem 0' }}>This is a test modal to verify modal functionality works.</p>
        <button 
          onClick={onClose}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  )
}