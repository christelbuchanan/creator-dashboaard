import React from 'react'
import { mockEarningsData } from '../data/mockData'
import StatsCard from '../components/StatsCard'
import { DollarSign, TrendingUp, Calendar, CreditCard } from 'lucide-react'

const Earnings: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Earnings Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Earnings" 
          value={`$${mockEarningsData.totalEarnings.toLocaleString()}`} 
          icon={<DollarSign size={20} />}
          bgColor="bg-gradient-to-br from-indigo-50 to-indigo-100"
        />
        <StatsCard 
          title="This Month" 
          value={`$${mockEarningsData.thisMonth.toLocaleString()}`} 
          icon={<TrendingUp size={20} />}
          change={{ value: 18.2, isPositive: true }}
        />
        <StatsCard 
          title="Last Month" 
          value={`$${mockEarningsData.lastMonth.toLocaleString()}`} 
          icon={<Calendar size={20} />}
        />
        <StatsCard 
          title="Pending Payout" 
          value={`$${mockEarningsData.pendingPayouts.toLocaleString()}`} 
          icon={<CreditCard size={20} />}
        />
      </div>
      
      {/* Earnings History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings History</h2>
        
        <div className="h-64 flex items-end space-x-2">
          {mockEarningsData.earningsHistory.map((item, index) => {
            const height = (item.amount / 2500) * 100
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-green-500 rounded-t-sm" 
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                  {item.month}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Streams */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Streams</h2>
          
          <div className="space-y-4">
            {mockEarningsData.revenueStreams.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{item.source}</span>
                  <span className="font-medium text-gray-900">${item.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-right">{item.percentage}% of total</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Payout Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payout Information</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Next Payout</h3>
                <p className="text-sm text-gray-500">November 1, 2023</p>
              </div>
              <div className="text-lg font-semibold text-gray-900">${mockEarningsData.pendingPayouts.toLocaleString()}</div>
            </div>
            
            <div className="p-3 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Payout Method</h3>
              <div className="flex items-center">
                <div className="w-10 h-6 bg-blue-600 rounded mr-2 flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <p className="text-sm text-gray-900">Visa ending in 4242</p>
                  <p className="text-xs text-gray-500">Expires 12/25</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Tax Information</h3>
              <p className="text-sm text-gray-600">Make sure your tax information is up to date to avoid any issues with payouts.</p>
              <button className="mt-2 text-sm text-indigo-600 font-medium hover:text-indigo-800">
                Update Tax Info
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-500">Oct 15, 2023</td>
                <td className="px-4 py-3 text-sm text-gray-900">E-commerce Template Sale</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Sale
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium text-green-600">+$49.99</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-500">Oct 12, 2023</td>
                <td className="px-4 py-3 text-sm text-gray-900">Portfolio Starter Sale</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Sale
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium text-green-600">+$29.99</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-500">Oct 10, 2023</td>
                <td className="px-4 py-3 text-sm text-gray-900">Monthly Subscription Revenue</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Subscription
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium text-green-600">+$350.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-500">Oct 5, 2023</td>
                <td className="px-4 py-3 text-sm text-gray-900">Donation from @user123</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                    Donation
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium text-green-600">+$25.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-500">Oct 1, 2023</td>
                <td className="px-4 py-3 text-sm text-gray-900">September Payout</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                    Payout
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium text-red-600">-$1,980.25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Earnings
