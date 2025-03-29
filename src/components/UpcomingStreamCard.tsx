import React, { useState } from 'react'
import { Calendar, Clock, Bell, BellOff } from 'lucide-react'

interface UpcomingStreamCardProps {
  stream: {
    id: string | number
    title: string
    description: string
    scheduledFor: string
    duration: string
    thumbnail: string
  }
}

const UpcomingStreamCard: React.FC<UpcomingStreamCardProps> = ({ stream }) => {
  const [isReminded, setIsReminded] = useState(false)
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const toggleReminder = () => {
    setIsReminded(!isReminded)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-indigo-200 transition-colors">
      <div className="relative">
        <img 
          src={stream.thumbnail} 
          alt={stream.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center text-white text-sm">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(stream.scheduledFor)}</span>
            <span className="mx-2">•</span>
            <Clock size={14} className="mr-1" />
            <span>{formatTime(stream.scheduledFor)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{stream.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{stream.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>{stream.duration}</span>
          </div>
          
          <button 
            onClick={toggleReminder}
            className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
              isReminded 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isReminded ? (
              <>
                <BellOff size={14} className="mr-1.5" />
                Remove Reminder
              </>
            ) : (
              <>
                <Bell size={14} className="mr-1.5" />
                Set Reminder
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpcomingStreamCard
