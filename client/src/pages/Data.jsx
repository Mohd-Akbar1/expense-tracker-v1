import React, { useState } from 'react';
import { Bell, Search, TrendingUp, TrendingDown } from 'lucide-react';

export default function ExpenseTrackerDashboard() {
  // Sample user data - replace with your fetched data
  const [user] = useState({
    name: 'Ananya',
    avatar: null
  });

  const [expenses] = useState([
    { id: 1, amount: 2100.00, category: 'Shopping', subCategory: 'Amazon', date: '31 May 2025', mode: 'UPI' },
    { id: 2, amount: 299.00, category: 'Movie', subCategory: 'PVR', date: '28 May 2025', mode: 'UPI' },
    { id: 3, amount: 5000.00, category: 'Investment', subCategory: 'Grow', date: '26 May 2025', mode: 'Bank' },
    { id: 4, amount: 2460.00, category: 'Travel', subCategory: 'IRCTC', date: '20 May 2025', mode: 'Card' },
    { id: 5, amount: 678.00, category: 'Food', subCategory: 'Swiggy', date: '15 May 2025', mode: 'UPI' },
  ]);
  
  const [subscriptions] = useState([
    { name: 'Netflix', amount: 149.00, date: '15 June 2025', color: 'bg-red-500' },
    { name: 'Spotify', amount: 49.00, date: '18 Aug 2025', color: 'bg-green-500' },
    { name: 'Figma', amount: 3999.00, date: '01 Jan 2026', color: 'bg-purple-500' },
    { name: 'WiFi', amount: 399.00, date: '11 June 2025', color: 'bg-red-500' },
    { name: 'Electricity', amount: 1265.00, date: '11 June 2025', color: 'bg-blue-500' },
  ]);

  // Stats data
  const accountBalance = 898450.00;
  const monthlyExpenses = 24093.00;
  const totalInvestment = 145555.00;
  const balanceChange = 6;
  const expenseChange = -2;

  // Monthly data for chart
  const monthlyData = [
    { month: 'E/M', value: 17000 },
    { month: 'Dec', value: 27000 },
    { month: 'Feb', value: 9000 },
    { month: 'Mar', value: 16000 },
    { month: 'Apr', value: 26000 },
    { month: 'May', value: 24093 },
  ];

  // Category data
  const categories = [
    { name: 'Food & Grocery', amount: 6156.00, color: '#22C55E', percentage: 25 },
    { name: 'Investment', amount: 5000.00, color: '#FBBF24', percentage: 21 },
    { name: 'Shopping', amount: 4356.00, color: '#10B981', percentage: 18 },
    { name: 'Travelling', amount: 3670.00, color: '#A855F7', percentage: 15 },
    { name: 'Miscellaneous', amount: 2749.00, color: '#FB923C', percentage: 11 },
    { name: 'Bill & Subscription', amount: 2162.00, color: '#06B6D4', percentage: 10 },
  ];

  const maxExpense = Math.max(...monthlyData.map(d => d.value));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hi, {user?.name || 'Ananya'} 👋
              </h1>
              <p className="text-sm text-gray-500">Track your all expense and transactions</p>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-sm text-gray-600 hidden md:flex items-center gap-2">
                <span>🕐</span>
                <span>11:11 PM | 31 June 2025 | IN</span>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search expenses, transaction, cards"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 md:w-80 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="relative">
                {user?.avatar ? (
                  <img src={user.avatar} alt="profile" className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                    {user?.name?.[0] || 'A'}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Account Balance */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Account Balance</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">⋮</button>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">₹{accountBalance.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-green-500 text-sm flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {balanceChange}% more than last month
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">₹58k ↓</span>
            </div>
          </div>

          {/* Monthly Expenses */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-50 rounded-lg">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Monthly Expenses</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">⋮</button>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">₹{monthlyExpenses.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-sm flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                {Math.abs(expenseChange)}% less than last month
              </span>
            </div>
          </div>

          {/* Total Investment */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Total Investment</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">⋮</button>
            </div>
            <div className="mb-4">
              <svg className="w-full h-16" viewBox="0 0 200 50" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="investGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A855F7" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,30 L25,35 L50,28 L75,32 L100,25 L125,30 L150,20 L175,25 L200,22 L200,50 L0,50 Z"
                  fill="url(#investGradient)"
                />
                <polyline
                  points="0,30 25,35 50,28 75,32 100,25 125,30 150,20 175,25 200,22"
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Invest Amount<br/>₹1,00,000.00</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">₹{totalInvestment.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
                <span className="text-green-600 text-sm flex items-center gap-1 justify-end">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Expenses Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-lg">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Monthly Expenses</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-sm">6% more than last month</span>
                <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Recent</option>
                  <option>Last 3 Months</option>
                  <option>Last 6 Months</option>
                </select>
                <button className="text-gray-400 hover:text-gray-600">⋮</button>
              </div>
            </div>
            <div className="flex items-end justify-between h-64 gap-2 md:gap-4">
              {monthlyData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-100 rounded-t-xl relative" style={{ height: '100%' }}>
                    <div 
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl absolute bottom-0 transition-all hover:from-blue-500 hover:to-blue-300"
                      style={{ height: `${(item.value / maxExpense) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Category */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Top Category</h3>
              </div>
              <div className="flex items-center gap-2">
                <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Recent</option>
                  <option>This Month</option>
                  <option>Last Month</option>
                </select>
                <button className="text-gray-400 hover:text-gray-600">⋮</button>
              </div>
            </div>
            
            <div className="flex items-center gap-8 flex-wrap justify-center lg:justify-start">
              {/* Donut Chart */}
              <div className="relative w-48 h-48 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  {categories.reduce((acc, cat, i) => {
                    const prevPercentage = categories.slice(0, i).reduce((sum, c) => sum + c.percentage, 0);
                    const circumference = 2 * Math.PI * 30;
                    const dashArray = `${(cat.percentage / 100) * circumference} ${circumference}`;
                    const dashOffset = -((prevPercentage / 100) * circumference);
                    
                    return [...acc, (
                      <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r="30"
                        fill="none"
                        stroke={cat.color}
                        strokeWidth="20"
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        className="transition-all hover:opacity-80"
                      />
                    )];
                  }, [])}
                </svg>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-3 min-w-0">
                {categories.map((cat, index) => (
                  <div key={index} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: cat.color }}></div>
                      <span className="text-sm text-gray-700 truncate">{cat.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 flex-shrink-0">₹{cat.amount.toFixed(2)}</span>
                  </div>
                ))}
                <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  More Details...
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Expenses */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Recent Expenses</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  🔍 Filter
                </button>
                <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Recent</option>
                  <option>Last Week</option>
                  <option>Last Month</option>
                </select>
                <button className="text-gray-400 hover:text-gray-600">⋮</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">S.N</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Category</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Sub Category</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => (
                    <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2 text-sm text-gray-900">{index + 1}.</td>
                      <td className="py-4 px-2 text-sm font-medium text-gray-900">₹{expense.amount.toFixed(2)}</td>
                      <td className="py-4 px-2 text-sm text-gray-700">{expense.category}</td>
                      <td className="py-4 px-2 text-sm text-gray-700">{expense.subCategory}</td>
                      <td className="py-4 px-2 text-sm text-gray-700">{expense.date}</td>
                      <td className="py-4 px-2">
                        <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium">{expense.mode}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bill & Subscription */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Bill & Subscription</h3>
              </div>
              <button className="text-gray-400 hover:text-gray-600">⋮</button>
            </div>

            <div className="space-y-4">
              {subscriptions.map((sub, index) => (
                <div key={index} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${sub.color} rounded-full flex items-center justify-center text-white font-semibold shadow-md`}>
                      {sub.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{sub.name}</div>
                      <div className="text-xs text-gray-500">{sub.date}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900">₹{sub.amount.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}