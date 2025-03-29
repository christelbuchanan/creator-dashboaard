import React, { useState } from 'react'
import { mockProjects } from '../data/mockData'
import ProjectCard from '../components/ProjectCard'
import { Plus, Search, Filter, SortDesc } from 'lucide-react'
import { useUser } from '../context/UserContext'

const Projects: React.FC = () => {
  const { isPublicView } = useUser()
  const [projects, setProjects] = useState(mockProjects)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all') // all, public, private, forSale
  
  const filteredProjects = projects
    .filter(project => {
      // For public view, only show public projects
      if (isPublicView && !project.isPublic) return false;
      
      // Search filter
      if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      
      // Visibility filter
      if (filter === 'public' && !project.isPublic) return false
      if (filter === 'private' && project.isPublic) return false
      if (filter === 'forSale' && project.price === null) return false
      
      return true
    })
  
  const handleToggleVisibility = (id: string) => {
    setProjects(projects.map(project => 
      project.id === id 
        ? { ...project, isPublic: !project.isPublic } 
        : project
    ))
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isPublicView ? "Projects" : "Your Projects"}
        </h1>
        
        {!isPublicView && (
          <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus size={18} className="mr-2" />
            New Project
          </button>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none block pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="all">All Projects</option>
                <option value="public">Public Only</option>
                {!isPublicView && <option value="private">Private Only</option>}
                <option value="forSale">For Sale</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
            </div>
            
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
              <SortDesc size={18} className="mr-2" />
              Sort
            </button>
          </div>
        </div>
      </div>
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isCreatorView={!isPublicView}
              onToggleVisibility={handleToggleVisibility}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects
