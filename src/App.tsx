import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import CreatorProfile from './pages/CreatorProfile'
import StreamScheduler from './pages/StreamScheduler'
import Projects from './pages/Projects'
import Analytics from './pages/Analytics'
import Earnings from './pages/Earnings'
import { UserProvider, useUser } from './context/UserContext'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('profile')
  const { isPublicView } = useUser()

  // If in public view and trying to access a creator-only page, redirect to profile
  React.useEffect(() => {
    if (isPublicView && ['schedule', 'analytics', 'earnings'].includes(currentPage)) {
      setCurrentPage('profile')
    }
  }, [isPublicView, currentPage])

  const renderPage = () => {
    // Don't allow access to certain pages in public view
    if (isPublicView) {
      switch (currentPage) {
        case 'profile':
          return <CreatorProfile />
        case 'projects':
          return <Projects />
        default:
          return <CreatorProfile />
      }
    }

    // Full access in creator view
    switch (currentPage) {
      case 'profile':
        return <CreatorProfile />
      case 'schedule':
        return <StreamScheduler />
      case 'projects':
        return <Projects />
      case 'analytics':
        return <Analytics />
      case 'earnings':
        return <Earnings />
      default:
        return <CreatorProfile />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}

export default App
