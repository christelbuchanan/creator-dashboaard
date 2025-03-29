import React, { useState } from 'react'
import { mockUpcomingStreams } from '../data/mockData'
import UpcomingStreamCard from '../components/UpcomingStreamCard'
import { Calendar, Clock, Info } from 'lucide-react'

const StreamScheduler: React.FC = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState('1:00')
  const [thumbnail, setThumbnail] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to the backend
    alert('Stream scheduled successfully!')
    // Reset form
    setTitle('')
    setDescription('')
    setDate('')
    setTime('')
    setDuration('1:00')
    setThumbnail('')
    setIsPublic(true)
  }
  
  const handleEditStream = (id: string) => {
    const stream = mockUpcomingStreams.find(s => s.id === id)
    if (stream) {
      const scheduledDate = new Date(stream.scheduledFor)
      
      setTitle(stream.title)
      setDescription(stream.description)
      setDate(scheduledDate.toISOString().split('T')[0])
      setTime(scheduledDate.toTimeString().slice(0, 5))
      setDuration(stream.duration.replace('h ', ':').replace('m', ''))
      setThumbnail(stream.thumbnail)
      setIsPublic(stream.isPublic)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Schedule a Stream</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Stream Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter a catchy title for your stream"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Describe what your stream will be about"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  id="thumbnail"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter a URL for your stream thumbnail"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="time"
                      id="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (hours:minutes)
                </label>
                <input
                  type="text"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="1:30"
                  pattern="[0-9]+:[0-5][0-9]"
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                  Make this stream public
                </label>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-md flex items-start mt-4">
                <Info size={18} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  Scheduling a stream will notify your followers and add it to your upcoming streams list.
                </p>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Schedule Stream
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      {/* Upcoming Streams */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Upcoming Streams</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockUpcomingStreams.map(stream => (
            <UpcomingStreamCard 
              key={stream.id} 
              stream={stream} 
              isCreatorView={true}
              onEdit={handleEditStream}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default StreamScheduler
