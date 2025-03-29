import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import StreamCard from '../components/StreamCard'
import UpcomingStreamCard from '../components/UpcomingStreamCard'
import { mockPastStreams, mockUpcomingStreams } from '../data/mockData'
import { Calendar, Users, Video, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Eye } from 'lucide-react'
import StatsCard from '../components/StatsCard'

const CreatorProfile: React.FC = () => {
  const { user, isPublicView } = useUser()
  const [activeTab, setActiveTab] = useState('streams')
  const [followersCount, setFollowersCount] = useState(user.followers)
  const [isFollowing, setIsFollowing] = useState(false)
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null)
  
  // Add like functionality to streams
  const [likedStreams, setLikedStreams] = useState<Record<string, boolean>>({})
  const [streamLikes, setStreamLikes] = useState<Record<string, number>>(
    mockPastStreams.reduce((acc, stream) => ({...acc, [stream.id]: stream.likes}), {})
  )
  
  // Add bookmark functionality
  const [bookmarkedStreams, setBookmarkedStreams] = useState<Record<string, boolean>>({})
  
  // Add comments functionality
  const [comments, setComments] = useState<Record<string, {id: string, user: string, text: string, timestamp: string}[]>>(
    mockPastStreams.reduce((acc, stream) => ({
      ...acc, 
      [stream.id]: [
        {
          id: '1',
          user: 'Sarah Chen',
          text: 'This was so helpful! Looking forward to the next stream.',
          timestamp: '2 days ago'
        },
        {
          id: '2',
          user: 'Mike Johnson',
          text: 'Great content as always. Could you cover authentication in the next stream?',
          timestamp: '1 day ago'
        }
      ]
    }), {})
  )
  
  // New comment input state
  const [newComments, setNewComments] = useState<Record<string, string>>({})
  
  const handleFollow = () => {
    if (isFollowing) {
      setFollowersCount(prev => prev - 1)
    } else {
      setFollowersCount(prev => prev + 1)
    }
    setIsFollowing(!isFollowing)
  }
  
  const handleLike = (streamId: string) => {
    setLikedStreams(prev => ({...prev, [streamId]: !prev[streamId]}))
    setStreamLikes(prev => ({
      ...prev, 
      [streamId]: prev[streamId] + (likedStreams[streamId] ? -1 : 1)
    }))
  }
  
  const handleBookmark = (streamId: string) => {
    setBookmarkedStreams(prev => ({...prev, [streamId]: !prev[streamId]}))
  }
  
  const handleAddComment = (streamId: string) => {
    if (!newComments[streamId]?.trim()) return
    
    const newComment = {
      id: Date.now().toString(),
      user: 'You',
      text: newComments[streamId],
      timestamp: 'Just now'
    }
    
    setComments(prev => ({
      ...prev,
      [streamId]: [...(prev[streamId] || []), newComment]
    }))
    
    setNewComments(prev => ({...prev, [streamId]: ''}))
  }
  
  const toggleComments = (streamId: string) => {
    setExpandedPostId(expandedPostId === streamId ? null : streamId)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
          {isPublicView && (
            <div className="absolute bottom-4 right-4">
              <button 
                onClick={handleFollow}
                className={`px-4 py-2 rounded-full font-medium text-sm ${
                  isFollowing 
                    ? 'bg-white text-indigo-600 hover:bg-gray-100' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          )}
        </div>
        
        {/* Profile Info */}
        <div className="px-6 py-5 flex flex-col md:flex-row">
          <div className="flex-shrink-0 -mt-16 md:-mt-20 mb-4 md:mb-0 z-10">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
            />
          </div>
          
          <div className="md:ml-6 flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">@{user.username}</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="text-center">
                  <div className="text-xl font-bold">{followersCount.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{user.following.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{user.stats.totalStreams}</div>
                  <div className="text-sm text-gray-500">Streams</div>
                </div>
              </div>
            </div>
            
            <p className="mt-3 text-gray-600">{user.bio}</p>
            
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-1" />
              <span>Joined {user.joinedDate}</span>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(user.socialLinks).map(([platform, url]) => (
                <a 
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards (Only visible in creator view) */}
      {!isPublicView && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard 
            title="Total Views"
            value={user.stats.totalViews.toLocaleString()}
            icon={<Video size={20} />}
            trend={12}
          />
          <StatsCard 
            title="Followers"
            value={followersCount.toLocaleString()}
            icon={<Users size={20} />}
            trend={8}
          />
          <StatsCard 
            title="Avg. Viewers"
            value={user.stats.avgViewers.toLocaleString()}
            icon={<Eye size={20} />}
            trend={-3}
          />
        </div>
      )}
      
      {/* Content Tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('streams')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'streams'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Streams
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'about'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              About
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'streams' && (
            <div className="space-y-6">
              {mockPastStreams.map(stream => (
                <div key={stream.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-200 transition-colors">
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0 w-48 h-28 rounded-lg overflow-hidden">
                      <img 
                        src={stream.thumbnail} 
                        alt={stream.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                        {stream.title}
                      </h3>
                      
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span>{new Date(stream.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <Video size={14} className="mr-1" />
                        <span>{stream.views.toLocaleString()} views</span>
                      </div>
                      
                      <div className="flex items-center mt-4 space-x-4">
                        <button 
                          onClick={() => handleLike(stream.id)}
                          className={`flex items-center text-sm font-medium ${
                            likedStreams[stream.id] ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <Heart size={18} className={likedStreams[stream.id] ? 'fill-current' : ''} />
                          <span className="ml-1">{streamLikes[stream.id] || 0}</span>
                        </button>
                        
                        <button 
                          onClick={() => toggleComments(stream.id)}
                          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                          <MessageCircle size={18} />
                          <span className="ml-1">{comments[stream.id]?.length || 0}</span>
                        </button>
                        
                        <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                          <Share2 size={18} />
                        </button>
                        
                        <button 
                          onClick={() => handleBookmark(stream.id)}
                          className={`flex items-center text-sm font-medium ${
                            bookmarkedStreams[stream.id] ? 'text-indigo-500' : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <Bookmark size={18} className={bookmarkedStreams[stream.id] ? 'fill-current' : ''} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Comments Section */}
                  {expandedPostId === stream.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-3">Comments</h4>
                      
                      <div className="space-y-3 mb-4">
                        {comments[stream.id]?.map(comment => (
                          <div key={comment.id} className="flex space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200"></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="text-sm font-medium text-gray-900">{comment.user}</h5>
                                <span className="text-xs text-gray-500">{comment.timestamp}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100"></div>
                        <div className="flex-1">
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <input
                              type="text"
                              placeholder="Add a comment..."
                              className="flex-1 px-3 py-2 text-sm focus:outline-none"
                              value={newComments[stream.id] || ''}
                              onChange={(e) => setNewComments(prev => ({...prev, [stream.id]: e.target.value}))}
                              onKeyDown={(e) => e.key === 'Enter' && handleAddComment(stream.id)}
                            />
                            <button 
                              onClick={() => handleAddComment(stream.id)}
                              className="px-3 py-2 bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600"
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'upcoming' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockUpcomingStreams.map(stream => (
                <UpcomingStreamCard key={stream.id} stream={stream} />
              ))}
            </div>
          )}
          
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">About {user.name}</h3>
                <p className="text-gray-600">{user.bio}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Social Links</h3>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(user.socialLinks).map(([platform, url]) => (
                    <a 
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{user.stats.totalStreams}</div>
                    <div className="text-sm text-gray-500">Total Streams</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{user.stats.totalViews.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Total Views</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{followersCount.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{user.stats.avgViewers}</div>
                    <div className="text-sm text-gray-500">Avg. Viewers</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreatorProfile
