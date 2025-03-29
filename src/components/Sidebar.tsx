import React from 'react'
import { 
  User, Calendar, FolderKanban, BarChart2, DollarSign, 
  Settings, HelpCircle, LogOut, Home
} from 'lucide-react'
import { useUser } from '../context/UserContext'

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const { isPublicView } = useUser()
  
  // Define menu items with visibility flags
  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <User size={20} />, publicVisible: true },
    { id: 'schedule', label: 'Schedule', icon: <Calendar size={20} />, publicVisible: false },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={20} />, publicVisible: true },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} />, publicVisible: false },
    { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} />, publicVisible: false },
  ]
  
  const bottomMenuItems = [
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, publicVisible: false },
    { id: 'help', label: 'Help', icon: <HelpCircle size={20} />, publicVisible: true },
  ]

  // Filter menu items based on view mode
  const visibleMenuItems = menuItems.filter(item => !isPublicView || item.publicVisible)
  const visibleBottomMenuItems = bottomMenuItems.filter(item => !isPublicView || item.publicVisible)

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md gradient-bg flex items-center justify-center text-white font-bold text-lg">
            C
          </div>
          <h1 className="ml-2 text-xl font-bold gradient-text">ChatAndBuild</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {visibleMenuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className={`mr-3 ${currentPage === item.id ? 'text-primary-600' : 'text-gray-500'}`}>
                {item.icon}
              </span>
              {item.label}
              {currentPage === item.id && (
                <span className="ml-auto w-1.5 h-5 rounded-full bg-primary-600"></span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <nav className="space-y-1">
          {visibleBottomMenuItems.map(item => (
            <button
              key={item.id}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="mr-3 text-gray-500">{item.icon}</span>
              {item.label}
            </button>
          ))}
          
          {!isPublicView && (
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              <span className="mr-3 text-red-500">
                <LogOut size={20} />
              </span>
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
