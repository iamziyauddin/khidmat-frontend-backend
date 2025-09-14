export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'senior_reviewer' | 'reviewer'
  avatar?: string
  createdAt: string
  lastLoginAt: string
  isActive: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}