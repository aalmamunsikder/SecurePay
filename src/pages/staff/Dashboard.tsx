import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import {
  Users,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  User,
  DollarSign,
  Clock,
  CheckCircle,
  HelpCircle,
  Activity,
  BarChart2
} from 'lucide-react';

// Mock stats data
interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalTransactions: number;
  pendingWithdrawals: number;
  dailyDeposits: number;
  weeklyRevenue: number;
}

// Mock recent users
interface RecentUser {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'suspended';
}

// Mock recent transactions
interface RecentTransaction {
  id: string;
  userId: string;
  userName: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

const StaffDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock stats data
        setStats({
          totalUsers: 1250,
          activeUsers: 458,
          totalTransactions: 3789,
          pendingWithdrawals: 14,
          dailyDeposits: 8750,
          weeklyRevenue: 24680
        });
        
        // Mock recent users
        setRecentUsers([
          {
            id: 'u1',
            name: 'John Smith',
            email: 'john@example.com',
            joinedDate: '2023-06-18T14:22:00Z',
            status: 'active'
          },
          {
            id: 'u2',
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            joinedDate: '2023-06-17T09:45:00Z',
            status: 'active'
          },
          {
            id: 'u3',
            name: 'Miguel Rodriguez',
            email: 'miguel@example.com',
            joinedDate: '2023-06-16T16:30:00Z',
            status: 'pending'
          },
          {
            id: 'u4',
            name: 'Lisa Wong',
            email: 'lisa@example.com',
            joinedDate: '2023-06-15T11:15:00Z',
            status: 'active'
          },
          {
            id: 'u5',
            name: 'Alex Taylor',
            email: 'alex@example.com',
            joinedDate: '2023-06-14T13:40:00Z',
            status: 'suspended'
          }
        ]);
        
        // Mock recent transactions
        setRecentTransactions([
          {
            id: 'txn-123',
            userId: 'u1',
            userName: 'John Smith',
            type: 'deposit',
            amount: 250.00,
            status: 'completed',
            date: '2023-06-18T16:40:00Z'
          },
          {
            id: 'txn-124',
            userId: 'u2',
            userName: 'Sarah Johnson',
            type: 'withdrawal',
            amount: 150.00,
            status: 'pending',
            date: '2023-06-18T14:25:00Z'
          },
          {
            id: 'txn-125',
            userId: 'u4',
            userName: 'Lisa Wong',
            type: 'deposit',
            amount: 500.00,
            status: 'completed',
            date: '2023-06-17T13:15:00Z'
          },
          {
            id: 'txn-126',
            userId: 'u3',
            userName: 'Miguel Rodriguez',
            type: 'withdrawal',
            amount: 100.00,
            status: 'failed',
            date: '2023-06-17T11:30:00Z'
          },
          {
            id: 'txn-127',
            userId: 'u5',
            userName: 'Alex Taylor',
            type: 'deposit',
            amount: 300.00,
            status: 'completed',
            date: '2023-06-16T09:55:00Z'
          }
        ]);
        
      } catch (error) {
        toast.error('Failed to load dashboard data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Status badge component
  const StatusBadge = ({ status, type }: { status: string, type: 'user' | 'transaction' }) => {
    let colorClass = '';
    let Icon = CheckCircle;
    
    if (type === 'user') {
      switch (status) {
        case 'active':
          colorClass = 'bg-success-100 text-success-800';
          Icon = CheckCircle;
          break;
        case 'pending':
          colorClass = 'bg-warning-100 text-warning-800';
          Icon = Clock;
          break;
        case 'suspended':
          colorClass = 'bg-error-100 text-error-800';
          Icon = AlertTriangle;
          break;
      }
    } else {
      switch (status) {
        case 'completed':
          colorClass = 'bg-success-100 text-success-800';
          Icon = CheckCircle;
          break;
        case 'pending':
          colorClass = 'bg-warning-100 text-warning-800';
          Icon = Clock;
          break;
        case 'failed':
          colorClass = 'bg-error-100 text-error-800';
          Icon = AlertTriangle;
          break;
      }
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
        <Icon size={12} className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mt-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Staff Dashboard</h1>
        <div className="text-sm text-gray-500">
          <span>Last updated: </span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Users Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-full mr-4">
              <Users size={24} className="text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
              <p className="text-3xl font-bold">{stats?.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-success-600 font-medium">{stats?.activeUsers.toLocaleString()}</span> active users
              </p>
            </div>
          </div>
        </div>

        {/* Transactions Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-success-100 p-3 rounded-full mr-4">
              <CreditCard size={24} className="text-success-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Transactions</h3>
              <p className="text-3xl font-bold">{stats?.totalTransactions.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-warning-600 font-medium">{stats?.pendingWithdrawals}</span> pending withdrawals
              </p>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-warning-100 p-3 rounded-full mr-4">
              <TrendingUp size={24} className="text-warning-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Revenue</h3>
              <p className="text-3xl font-bold">${stats?.weeklyRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-success-600 font-medium">${stats?.dailyDeposits.toLocaleString()}</span> today
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Users</h2>
            <a href="/staff/users" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
              View all <ChevronRight size={16} />
            </a>
          </div>
          <div className="divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <div key={user.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full p-2 mr-4">
                    <User size={16} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <StatusBadge status={user.status} type="user" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Joined {formatDate(user.joinedDate)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
            <a href="/staff/transactions" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
              View all <ChevronRight size={16} />
            </a>
          </div>
          <div className="divide-y divide-gray-200">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className={`rounded-full p-2 mr-4 ${
                    transaction.type === 'deposit' 
                      ? 'bg-success-100 text-success-600' 
                      : 'bg-primary-100 text-primary-600'
                  }`}>
                    {transaction.type === 'deposit' ? (
                      <DollarSign size={16} />
                    ) : (
                      <CreditCard size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{transaction.userName}</h3>
                        <p className="text-xs text-gray-500">{transaction.id}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`font-medium ${
                          transaction.type === 'deposit' 
                            ? 'text-success-600' 
                            : 'text-primary-600'
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </div>
                        <StatusBadge status={transaction.status} type="transaction" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Activity Chart Placeholder */}
      <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Activity Overview</h2>
        </div>
        <div className="p-6">
          <div className="flex justify-center items-center py-12 text-gray-500">
            <BarChart2 size={24} className="mr-2" />
            <span>Activity chart visualization would go here</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard; 