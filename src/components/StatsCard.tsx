import React, { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: number
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend }) => {
  const isTrendPositive = trend && trend > 0
  const isTrendNegative = trend && trend < 0

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-indigo-200 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          
          {trend !== undefined && (
            <div className="flex items-center mt-2">
              {isTrendPositive && (
                <>
                  <TrendingUp size={16} className="text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-500">+{trend}%</span>
                </>
              )}
              
              {isTrendNegative && (
                <>
                  <TrendingDown size={16} className="text-red-500 mr-1" />
                  <span className="text-sm font-medium text-red-500">{trend}%</span>
                </>
              )}
              
              {trend === 0 && (
                <span className="text-sm font-medium text-gray-500">0%</span>
              )}
              
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StatsCard
