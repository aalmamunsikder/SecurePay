import React, { useState, useEffect } from 'react';
import { 
  BarChart3, DollarSign, Users, Clock, 
  TrendingUp, ShoppingCart, Calendar, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Mock data for platform statistics
const mockStats = {
  totalBalance: 8450.75,
  pendingWithdrawals: 1250.25,
  totalUsers: 124,
  transactionsToday: 18,
  recentTransactions: [
    { id: 'txn-123', type: 'deposit', amount: 175.50, user: 'John Doe', date: new Date(Date.now() - 1000 * 60 * 30), status: 'completed' },
    { id: 'txn-124', type: 'withdrawal', amount: 50.00, user: 'Emma Smith', date: new Date(Date.now() - 1000 * 60 * 120), status: 'pending' },
    { id: 'txn-125', type: 'deposit', amount: 300.00, user: 'Michael Brown', date: new Date(Date.now() - 1000 * 60 * 180), status: 'completed' },
    { id: 'txn-126', type: 'withdrawal', amount: 125.25, user: 'Sarah Johnson', date: new Date(Date.now() - 1000 * 60 * 240), status: 'approved' },
    { id: 'txn-127', type: 'deposit', amount: 75.00, user: 'David Wilson', date: new Date(Date.now() - 1000 * 60 * 300), status: 'completed' },
  ],
  pendingWithdrawalRequests: [
    { id: 'wdr-123', amount: 100.00, user: 'Emma Smith', date: new Date(Date.now() - 1000 * 60 * 120) },
    { id: 'wdr-124', amount: 250.25, user: 'Sarah Johnson', date: new Date(Date.now() - 1000 * 60 * 240) },
    { id: 'wdr-125', amount: 400.00, user: 'Robert Brown', date: new Date(Date.now() - 1000 * 60 * 360) },
    { id: 'wdr-126', amount: 500.00, user: 'Lisa Anderson', date: new Date(Date.now() - 1000 * 60 * 480) },
  ],
  recentUsers: [
    { id: 'usr-123', name: 'John Doe', email: 'john.doe@example.com', date: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { id: 'usr-124', name: 'Emma Smith', email: 'emma.smith@example.com', date: new Date(Date.now() - 1000 * 60 * 60 * 6) },
    { id: 'usr-125', name: 'Michael Brown', email: 'michael.brown@example.com', date: new Date(Date.now() - 1000 * 60 * 60 * 12) },
  ],
  monthlyStats: [
    { month: 'Jan', deposits: 5200, withdrawals: 3200 },
    { month: 'Feb', deposits: 6100, withdrawals: 4100 },
    { month: 'Mar', deposits: 4800, withdrawals: 2800 },
    { month: 'Apr', deposits: 7200, withdrawals: 5200 },
    { month: 'May', deposits: 8500, withdrawals: 5500 },
    { month: 'Jun', deposits: 9200, withdrawals: 6200 },
  ]
};

const PlatformOwnerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(mockStats);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, we would fetch data from an API
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockStats);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  // Format date to "MM/DD/YYYY, HH:MM AM/PM"
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Format date to "X hours/minutes ago"
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return `${interval} year${interval === 1 ? '' : 's'} ago`;
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} month${interval === 1 ? '' : 's'} ago`;
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} day${interval === 1 ? '' : 's'} ago`;
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    }
    
    return `${Math.floor(seconds)} second${seconds === 1 ? '' : 's'} ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Platform Dashboard</h1>
        <div className="text-sm text-gray-500">
          <span className="font-medium">Platform: </span>
          {currentUser?.platformSlug || 'Unknown'}
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Balance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Balance</h3>
            <div className="rounded-full bg-primary-100 p-2">
              <DollarSign size={18} className="text-primary-600" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                ${stats.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-500 mt-1">Available for withdrawals</p>
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-success-100 text-success-800">
              <TrendingUp size={12} className="inline mr-1" /> +12.5%
            </div>
          </div>
        </div>
        
        {/* Pending Withdrawals */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Pending Withdrawals</h3>
            <div className="rounded-full bg-warning-100 p-2">
              <Clock size={18} className="text-warning-600" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                ${stats.pendingWithdrawals.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-500 mt-1">{stats.pendingWithdrawalRequests.length} requests to review</p>
            </div>
            <Link to="/platform/withdrawals" className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center">
              View <ArrowRight size={12} className="ml-1" />
            </Link>
          </div>
        </div>
        
        {/* Users */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
            <div className="rounded-full bg-secondary-100 p-2">
              <Users size={18} className="text-secondary-600" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalUsers}
              </p>
              <p className="text-xs text-gray-500 mt-1">+{stats.recentUsers.length} new today</p>
            </div>
            <Link to="/platform/users" className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center">
              Manage <ArrowRight size={12} className="ml-1" />
            </Link>
          </div>
        </div>
        
        {/* Transactions Today */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Transactions Today</h3>
            <div className="rounded-full bg-accent-100 p-2">
              <ShoppingCart size={18} className="text-accent-600" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {stats.transactionsToday}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ${stats.recentTransactions
                  .filter(t => t.date.toDateString() === new Date().toDateString())
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} processed
              </p>
            </div>
            <Link to="/platform/transactions" className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center">
              Details <ArrowRight size={12} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Recent Transactions</h3>
            <Link to="/platform/transactions" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'deposit' ? 'bg-success-100' : 'bg-warning-100'
                        }`}>
                          {transaction.type === 'deposit' ? (
                            <TrendingUp size={14} className="text-success-600" />
                          ) : (
                            <ArrowRight size={14} className="text-warning-600" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {transaction.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        transaction.type === 'deposit' ? 'text-success-600' : 'text-warning-600'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {timeAgo(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'completed' ? 'bg-success-100 text-success-800' :
                        transaction.status === 'pending' ? 'bg-warning-100 text-warning-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pending Withdrawals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Pending Withdrawals</h3>
            <Link to="/platform/withdrawals" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {stats.pendingWithdrawalRequests.length > 0 ? (
              stats.pendingWithdrawalRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-warning-100 flex items-center justify-center">
                      <Clock size={18} className="text-warning-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{request.user}</p>
                      <p className="text-xs text-gray-500">{timeAgo(request.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">${request.amount.toFixed(2)}</p>
                    <div className="flex space-x-1 mt-1">
                      <button className="text-xs py-1 px-2 bg-success-100 text-success-700 rounded-md hover:bg-success-200 transition-colors">
                        Approve
                      </button>
                      <button className="text-xs py-1 px-2 bg-error-100 text-error-700 rounded-md hover:bg-error-200 transition-colors">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 text-sm">No pending withdrawal requests</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Recent Users */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Recent Users</h3>
          <Link to="/platform/users" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {timeAgo(user.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link to={`/platform/users?id=${user.id}`} className="text-primary-600 hover:text-primary-900">
                        View
                      </Link>
                      <span className="text-gray-300">|</span>
                      <button className="text-error-600 hover:text-error-900">
                        Suspend
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlatformOwnerDashboard;