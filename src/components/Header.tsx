import React from 'react'
import { Bell, MessageSquare, Search, Eye, EyeOff } from 'lucide-react'
import { useUser } from '../context/UserContext'

const Header: React.FC = () => {
  const { user, isPublicView, togglePublicView } = useUser()

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-1">
            <div className="max-w-xs w-full lg:max-w-md">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} />
                </div>
                <input
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={togglePublicView}
              className="flex items-center px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 mr-2"
            >
              {isPublicView ? (
                <>
                  <EyeOff size={16} className="mr-1.5 text-gray-500" />
                  Creator View
                </>
              ) : (
                <>
                  <Eye size={16} className="mr-1.5 text-gray-500" />
                  Public View
                </>
              )}
            </button>
            
            {!isPublicView && (
              <>
                <button className="p-2 text-gray-500 hover:text-gray-700 relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <button className="p-2 text-gray-500 hover:text-gray-700 relative ml-2">
                  <MessageSquare size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </>
            )}
            
            <div className="ml-3 relative">
              <div>
                <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={user.avatar}
                    alt={user.name}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
