import React from 'react'
import { Eye, Star, DollarSign, ExternalLink, Lock } from 'lucide-react'

interface ProjectCardProps {
  project: {
    id: string | number
    title: string
    description: string
    thumbnail: string
    stars: number
    price: number | null
    isPublic: boolean
    views?: number
  }
  isCreatorView?: boolean
  onToggleVisibility?: (id: string) => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  isCreatorView = false,
  onToggleVisibility 
}) => {
  return (
    <div className="card group hover:border-indigo-200">
      <div className="relative mb-3 rounded-lg overflow-hidden">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {project.price !== null && (
          <div className="absolute top-2 right-2 bg-indigo-600 text-white text-sm px-3 py-1 rounded-full font-medium flex items-center">
            <DollarSign size={14} className="mr-0.5" />
            {project.price}
          </div>
        )}
        
        {isCreatorView && !project.isPublic && (
          <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Lock size={12} className="mr-1" />
            Private
          </div>
        )}
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
        {project.title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          {project.views !== undefined && (
            <div className="flex items-center">
              <Eye size={14} className="mr-1" />
              <span>{project.views.toLocaleString()}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <Star size={14} className="mr-1 text-amber-400" />
            <span>{project.stars}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isCreatorView && (
            <button 
              onClick={() => onToggleVisibility?.(project.id.toString())}
              className={`text-xs px-2 py-1 rounded ${
                project.isPublic 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {project.isPublic ? 'Public' : 'Private'}
            </button>
          )}
          
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
            View
            <ExternalLink size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
