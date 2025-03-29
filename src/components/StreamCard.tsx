import React from 'react'
import { Eye, Clock, Calendar } from 'lucide-react'

interface StreamCardProps {
  stream: {
    id: number
    title: string
    thumbnail: string
    views: number
    duration: string
    date: string
  }
}

const StreamCard: React.FC<StreamCardProps> = ({ stream }) => {
  return (
    <div className="card group hover:border-indigo-200">
      <div className="relative mb-3 rounded-lg overflow-hidden">
        <img 
          src={stream.thumbnail} 
          alt={stream.title} 
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {stream.duration}
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
        {stream.title}
      </h3>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Eye size={14} className="mr-1" />
          <span>{stream.views.toLocaleString()} views</span>
        </div>
        
        <div className="flex items-center">
          <Calendar size={14} className="mr-1" />
          <span>{new Date(stream.date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}

export default StreamCard
