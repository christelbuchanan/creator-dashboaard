import React, { createContext, useContext, useState, ReactNode } from 'react'
import { mockUserData } from '../data/mockData'

interface UserContextType {
  user: typeof mockUserData
  isLoading: boolean
  isPublicView: boolean
  togglePublicView: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState(mockUserData)
  const [isLoading] = useState(false)
  const [isPublicView, setIsPublicView] = useState(false)

  const togglePublicView = () => {
    setIsPublicView(prev => !prev)
  }

  return (
    <UserContext.Provider value={{ user, isLoading, isPublicView, togglePublicView }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
