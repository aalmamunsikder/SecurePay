import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BarChart, 
  Users, 
  ArrowUp, 
  DollarSign, 
  Globe, 
  Layers,
  Server,
  TrendingUp,
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Mock data interfaces
interface SystemStats {
  totalPlatforms: number;
  activePlatforms: number;
  totalUsers: number;
  totalTransactions: number;
  totalRevenue: number;
  systemUptime: string;
  serverLoad: number;
}

interface PlatformData {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'pending' | 'suspended';
  ownerName: string;
  ownerEmail: string;
  users: number;
  transactions: number;
  lastActivity: string; // ISO date string
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string; // ISO date string
  resolved: boolean;
}

const OwnerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [platforms, setPlatforms] = useState<PlatformData[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock system stats
      const mockStats: SystemStats = {
        totalPlatforms: 12,
        activePlatforms: 10,
        totalUsers: 24680,
        totalTransactions: 156750,
        totalRevenue: 567890.45,
        systemUptime: '99.98%',
        serverLoad: 32.5
      };
      
      // Mock platforms
      const mockPlatforms: PlatformData[] = [
        {
          id: 'platform-1',
          name: 'FinTech Solutions',
          slug: 'fintech-solutions',
          status: 'active',
          ownerName: 'John Smith',
          ownerEmail: 'john@fintechsolutions.com',
          users: 4250,
          transactions: 34560,
          lastActivity: new Date(Date.now() - 1000 * 60 * 5).toISOString()
        },
        {
          id: 'platform-2',
          name: 'PayEasy',
          slug: 'payeasy',
          status: 'active',
          ownerName: 'Sarah Johnson',
          ownerEmail: 'sarah@payeasy.com',
          users: 3680,
          transactions: 29845,
          lastActivity: new Date(Date.now() - 1000 * 60 * 15).toISOString()
        },
        {
          id: 'platform-3',
          name: 'CryptoExchange',
          slug: 'crypto-exchange',
          status: 'active',
          ownerName: 'Mike Wilson',
          ownerEmail: 'mike@cryptoexchange.com',
          users: 5120,
          transactions: 42300,
          lastActivity: new Date(Date.now() - 1000 * 60 * 30).toISOString()
        },
        {
          id: 'platform-4',
          name: 'GlobalPay',
          slug: 'globalpay',
          status: 'active',
          ownerName: 'Lisa Chen',
          ownerEmail: 'lisa@globalpay.com',
          users: 3950,
          transactions: 31200,
          lastActivity: new Date(Date.now() - 1000 * 60 * 60).toISOString()
        },
        {
          id: 'platform-5',
          name: 'InvestSmart',
          slug: 'investsmart',
          status: 'pending',
          ownerName: 'Robert Taylor',
          ownerEmail: 'robert@investsmart.com',
          users: 1850,
          transactions: 8900,
          lastActivity: new Date(Date.now() - 1000 * 60 * 90).toISOString()
        }
      ];
      
      // Mock alerts
      const mockAlerts: SystemAlert[] = [
        {
          id: 'alert-1',
          type: 'warning',
          message: 'High server load detected on API server cluster',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          resolved: false
        },
        {
          id: 'alert-2',
          type: 'info',
          message: 'Scheduled database maintenance in 3 days',
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          resolved: false
        },
        {
          id: 'alert-3',
          type: 'error',
          message: 'Payment gateway connection timeout',
          timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
          resolved: true
        }
      ];
      
      setStats(mockStats);
      setPlatforms(mockPlatforms);
      setAlerts(mockAlerts);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Format large numbers
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Format date to relative time
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
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

  // Status badge component
  const StatusBadge = ({ status }: { status: PlatformData['status'] }) => {
    let colorClass = '';
    let Icon = CheckCircle;
    
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
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
        <Icon size={12} className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Alert component
  const AlertItem = ({ alert }: { alert: SystemAlert }) => {
    let colorClass = '';
    let Icon = HelpCircle;
    
    switch (alert.type) {
      case 'info':
        colorClass = 'bg-blue-100 text-blue-800 border-blue-200';
        Icon = HelpCircle;
        break;
      case 'warning':
        colorClass = 'bg-warning-100 text-warning-800 border-warning-200';
        Icon = Clock;
        break;
      case 'error':
        colorClass = 'bg-error-100 text-error-800 border-error-200';
        Icon = AlertTriangle;
        break;
    }
    
    return (
      <div className={`flex items-start p-4 rounded-lg border ${colorClass} ${alert.resolved ? 'opacity-60' : ''}`}>
        <Icon size={20} className="mr-3 mt-0.5" />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <p className="font-medium">{alert.message}</p>
            <span className="text-xs">{timeAgo(alert.timestamp)}</span>
          </div>
          {alert.resolved && (
            <p className="text-xs mt-1 font-medium">Resolved</p>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">System Dashboard</h1>
        <div className="text-sm bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
          <span className="font-medium">System Status:</span> Operational
        </div>
      </div>
      
      {/* System Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Platforms */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-full mr-4">
              <Layers size={24} className="text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Platforms</h3>
              <p className="text-3xl font-bold">{stats?.totalPlatforms}</p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-success-600 font-medium">{stats?.activePlatforms}</span> active
              </p>
            </div>
          </div>
        </div>
        
        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-success-100 p-3 rounded-full mr-4">
              <Users size={24} className="text-success-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
              <p className="text-3xl font-bold">{formatNumber(stats?.totalUsers || 0)}</p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-success-600 font-medium">
                  <ArrowUp size={12} className="inline mr-1" />
                  8.1%
                </span> this month
              </p>
            </div>
          </div>
        </div>
        
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-warning-100 p-3 rounded-full mr-4">
              <DollarSign size={24} className="text-warning-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Revenue</h3>
              <p className="text-3xl font-bold">{formatCurrency(stats?.totalRevenue || 0)}</p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-success-600 font-medium">
                  <ArrowUp size={12} className="inline mr-1" />
                  12.3%
                </span> this month
              </p>
            </div>
          </div>
        </div>
        
        {/* System Health */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-accent-100 p-3 rounded-full mr-4">
              <Server size={24} className="text-accent-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">System Health</h3>
              <p className="text-3xl font-bold">{stats?.systemUptime}</p>
              <p className="text-sm text-gray-500 mt-1">
                Server load: <span className="font-medium">{stats?.serverLoad}%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Platforms */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Active Platforms</h3>
            <Link to="/owner/platforms" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {platforms.map((platform) => (
                  <tr key={platform.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-primary-100 p-2 rounded-full mr-3">
                          <Globe size={16} className="text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{platform.name}</div>
                          <div className="text-sm text-gray-500">{platform.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{platform.ownerName}</div>
                      <div className="text-sm text-gray-500">{platform.ownerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={platform.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatNumber(platform.users)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {timeAgo(platform.lastActivity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">System Alerts</h3>
          </div>
          <div className="p-6 space-y-4">
            {alerts.length === 0 ? (
              <div className="text-center py-6">
                <div className="mx-auto h-12 w-12 bg-success-100 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle size={24} className="text-success-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">All systems normal</h3>
                <p className="text-xs text-gray-500">No alerts at this time</p>
              </div>
            ) : (
              alerts.map(alert => (
                <AlertItem key={alert.id} alert={alert} />
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* System Activity Graph Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">System Activity (Last 7 Days)</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs font-medium rounded-md bg-primary-50 text-primary-700">Transactions</button>
            <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-600 hover:bg-gray-100">User Sessions</button>
            <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-600 hover:bg-gray-100">API Calls</button>
          </div>
        </div>
        
        {/* Placeholder for chart */}
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <div className="text-center">
            <BarChart size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">Activity chart visualization would go here</p>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Users size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Manage Platform Owners</h3>
              <p className="text-xs text-gray-500">Add, remove or edit platform owners</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-gray-400" />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <Globe size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">System Settings</h3>
              <p className="text-xs text-gray-500">Configure system-wide settings</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-gray-400" />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-orange-100 p-2 rounded-full mr-3">
              <TrendingUp size={20} className="text-orange-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">View System Reports</h3>
              <p className="text-xs text-gray-500">Analytics and performance reports</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;