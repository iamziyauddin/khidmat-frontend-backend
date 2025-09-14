import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { User, AuthState, LoginCredentials } from '@/types/auth'

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null }
    case 'LOGIN_SUCCESS':
      return { ...state, isLoading: false, user: action.payload, error: null }
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, error: action.payload }
    case 'LOGOUT':
      return { ...state, user: null, isLoading: false, error: null }
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : null 
      }
    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Simulate authentication check on app load
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      // Simulate user data retrieval
      const mockUser: User = {
        id: '1',
        email: 'admin@khidmat.com',
        name: 'System Administrator',
        role: 'admin',
        avatar: 'https://images.pexels.com/photos/4064840/pexels-photo-4064840.jpeg?auto=compress&cs=tinysrgb&w=150',
        createdAt: '2024-01-01T00:00:00Z',
        lastLoginAt: new Date().toISOString(),
        isActive: true,
      }
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser })
    }
  }, [])

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' })
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication logic
      if (credentials.email === 'admin@khidmat.com' && credentials.password === 'admin123') {
        const user: User = {
          id: '1',
          email: credentials.email,
          name: 'System Administrator',
          role: 'admin',
          avatar: 'https://images.pexels.com/photos/4064840/pexels-photo-4064840.jpeg?auto=compress&cs=tinysrgb&w=150',
          createdAt: '2024-01-01T00:00:00Z',
          lastLoginAt: new Date().toISOString(),
          isActive: true,
        }
        
        localStorage.setItem('auth_token', 'mock_token')
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      } else if (credentials.email === 'reviewer@khidmat.com' && credentials.password === 'reviewer123') {
        const user: User = {
          id: '2',
          email: credentials.email,
          name: 'Senior Reviewer',
          role: 'senior_reviewer',
          avatar: 'https://images.pexels.com/photos/3767392/pexels-photo-3767392.jpeg?auto=compress&cs=tinysrgb&w=150',
          createdAt: '2024-01-01T00:00:00Z',
          lastLoginAt: new Date().toISOString(),
          isActive: true,
        }
        
        localStorage.setItem('auth_token', 'mock_token')
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' })
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' })
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    dispatch({ type: 'LOGOUT' })
  }

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData })
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}