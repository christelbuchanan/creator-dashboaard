import React from 'react'
import { mockAnalyticsData } from '../data/mockData'
import StatsCard from '../components/StatsCard'
import { TrendingUp, Users, Eye, Clock } from 'lucide-react'

const Analytics: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Views" 
          value="125,430" 
          icon={<Eye size={20} />}
          change={{ value: 8.1, isPositive: true }}
        />
        <StatsCard 
          title="Follower Growth" 
          value="+2,345" 
          icon={<Users size={20} />}
          change={{ value: 12.3, isPositive: true }}
        />
        <StatsCard 
          title="Engagement Rate" 
          value="18.7%" 
          icon={<TrendingUp size={20} />}
          change={{ value: 3.2, isPositive: true }}
        />
        <StatsCard 
          title="Avg. Watch Time" 
          value="18:45" 
          icon={<Clock size={20} />}
          change={{ value: 2.3, isPositive: true }}
        />
      </div>
      
      {/* Views Over Time */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Views Over Time</h2>
        
        <div className="h-64 flex items-end space-x-2">
          {mockAnalyticsData.viewsOverTime.map((item, index) => {
            const height = (item.views / 3500) * 100
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-indigo-500 rounded-t-sm" 
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                  {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Performing Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Content</h2>
          
          <div className="space-y-4">
            {mockAnalyticsData.topPerformingContent.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                  <div className="flex items-center mt-1">
                    <Eye size={14} className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">{item.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Follower Growth */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Follower Growth</h2>
          
          <div className="h-64 flex items-end space-x-2">
            {mockAnalyticsData.followerGrowth.map((item, index) => {
              const height = (item.followers / 13000) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-green-500 rounded-t-sm" 
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Audience Demographics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Audience Demographics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Distribution */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Age Distribution</h3>
            
            <div className="space-y-3">
              {mockAnalyticsData.audienceDemographics.age.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{item.group}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Geographic Distribution */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Geographic Distribution</h3>
            
            <div className="space-y-3">
              {mockAnalyticsData.audienceDemographics.countries.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{item.name}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
