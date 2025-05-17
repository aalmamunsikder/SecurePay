import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Search, 
  UserPlus, 
  Mail, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Globe,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Filter,
  Download
} from 'lucide-react';
import { toast } from 'react-toastify';

// Platform owner interface
interface PlatformOwner {
  id: string;
  name: string;
  email: string;
  platformName: string;
  platformSlug: string;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  lastActive: string;
  usersCount: number;
  transactionsCount: number;
}

const PlatformOwners: React.FC = () => {
  const { currentUser } = useAuth();
  const [owners, setOwners] = useState<PlatformOwner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<PlatformOwner | null>(null);
  const [newOwnerData, setNewOwnerData] = useState({
    name: '',
    email: '',
    platformName: '',
    platformSlug: ''
  });
  
  const ownersPerPage = 10;

  useEffect(() => {
    fetchPlatformOwners();
  }, []);

  const fetchPlatformOwners = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockOwners: PlatformOwner[] = [
        {
          id: 'owner-1',
          name: 'John Smith',
          email: 'john@fintechsolutions.com',
          platformName: 'FinTech Solutions',
          platformSlug: 'fintech-solutions',
          status: 'active',
          createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          usersCount: 4250,
          transactionsCount: 34560
        },
        {
          id: 'owner-2',
          name: 'Sarah Johnson',
          email: 'sarah@payeasy.com',
          platformName: 'PayEasy',
          platformSlug: 'payeasy',
          status: 'active',
          createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
          lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          usersCount: 3680,
          transactionsCount: 29845
        },
        {
          id: 'owner-3',
          name: 'Mike Wilson',
          email: 'mike@cryptoexchange.com',
          platformName: 'CryptoExchange',
          platformSlug: 'crypto-exchange',
          status: 'active',
          createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          lastActive: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          usersCount: 5120,
          transactionsCount: 42300
        },
        {
          id: 'owner-4',
          name: 'Lisa Chen',
          email: 'lisa@globalpay.com',
          platformName: 'GlobalPay',
          platformSlug: 'globalpay',
          status: 'active',
          createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
          lastActive: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          usersCount: 3950,
          transactionsCount: 31200
        },
        {
          id: 'owner-5',
          name: 'Robert Taylor',
          email: 'robert@investsmart.com',
          platformName: 'InvestSmart',
          platformSlug: 'investsmart',
          status: 'pending',
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          usersCount: 1850,
          transactionsCount: 8900
        },
        {
          id: 'owner-6',
          name: 'Emily Davis',
          email: 'emily@moneytransfer.com',
          platformName: 'MoneyTransfer',
          platformSlug: 'moneytransfer',
          status: 'suspended',
          createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
          lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          usersCount: 2100,
          transactionsCount: 15400
        }
      ];
      
      setOwners(mockOwners);
    } catch (error) {
      console.error('Failed to fetch platform owners', error);
      toast.error('Failed to load platform owners');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter platform owners based on search and filters
  const filteredOwners = owners.filter(owner => {
    // Filter by status
    if (statusFilter !== 'all' && owner.status !== statusFilter) {
      return false;
    }
    
    // Filter by search query (case insensitive)
    if (searchQuery && 
        !owner.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !owner.email.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !owner.platformName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !owner.platformSlug.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOwners.length / ownersPerPage);
  const currentOwners = filteredOwners.slice(
    (currentPage - 1) * ownersPerPage,
    currentPage * ownersPerPage
  );

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Format time ago
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
    if (interval === 1) return `${interval} year ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    if (interval === 1) return `${interval} month ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    if (interval === 1) return `${interval} day ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    if (interval === 1) return `${interval} hour ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    if (interval === 1) return `${interval} minute ago`;
    
    return `${Math.floor(seconds)} seconds ago`;
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: PlatformOwner['status'] }) => {
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

  // Handler functions for various owner actions
  const handleAddOwner = () => {
    // Validate inputs
    if (!newOwnerData.name.trim() || !newOwnerData.email.trim() || 
        !newOwnerData.platformName.trim() || !newOwnerData.platformSlug.trim()) {
      toast.error('All fields are required');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newOwnerData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Slug validation (only lowercase letters, numbers, and hyphens)
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(newOwnerData.platformSlug)) {
      toast.error('Platform slug can only contain lowercase letters, numbers, and hyphens');
      return;
    }
    
    // Create new platform owner
    const newOwner: PlatformOwner = {
      id: `owner-${owners.length + 1}`,
      name: newOwnerData.name,
      email: newOwnerData.email,
      platformName: newOwnerData.platformName,
      platformSlug: newOwnerData.platformSlug,
      status: 'pending',
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      usersCount: 0,
      transactionsCount: 0
    };
    
    setOwners([...owners, newOwner]);
    setShowAddModal(false);
    
    // Reset form
    setNewOwnerData({
      name: '',
      email: '',
      platformName: '',
      platformSlug: ''
    });
    
    toast.success('Platform owner added successfully');
  };

  const handleStatusChange = (ownerId: string, newStatus: PlatformOwner['status']) => {
    setOwners(owners.map(owner => 
      owner.id === ownerId ? { ...owner, status: newStatus } : owner
    ));
    
    const statusAction = newStatus === 'active' ? 'activated' : 
                          newStatus === 'suspended' ? 'suspended' : 'set to pending';
    
    toast.success(`Platform owner ${statusAction} successfully`);
  };

  const handleDeleteOwner = (ownerId: string) => {
    if (window.confirm('Are you sure you want to delete this platform owner? This action cannot be undone.')) {
      setOwners(owners.filter(owner => owner.id !== ownerId));
      toast.success('Platform owner deleted successfully');
    }
  };

  const handleSendEmail = (owner: PlatformOwner) => {
    toast.info(`Email would be sent to ${owner.email}`);
  };

  // Download owners as CSV
  const downloadOwnersCSV = () => {
    toast.info('Platform owners would be downloaded as CSV');
    // In a real app, this would generate and download a CSV file
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Platform Owners</h1>
        <div className="flex gap-2">
          <button
            onClick={downloadOwnersCSV}
            className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium flex items-center hover:bg-gray-50"
          >
            <Download size={16} className="mr-2" /> Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center hover:bg-primary-700"
          >
            <UserPlus size={16} className="mr-2" /> Add Platform Owner
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search size={16} className="text-gray-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by name, email, or platform..."
                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            
            <button
              onClick={resetFilters}
              className="py-2 px-3 border border-gray-300 rounded-md text-gray-600 hover:text-gray-800 flex items-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {/* Platform Owner Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner / Platform
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transactions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOwners.map((owner) => (
                <tr key={owner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-2 rounded-full mr-3">
                        <Globe size={16} className="text-primary-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{owner.name}</div>
                        <div className="text-sm text-gray-500">{owner.email}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {owner.platformName} <span className="text-gray-400">({owner.platformSlug})</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={owner.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatNumber(owner.usersCount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatNumber(owner.transactionsCount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(owner.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {timeAgo(owner.lastActive)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleSendEmail(owner)}
                        className="text-gray-600 hover:text-gray-900 p-1"
                        title="Email platform owner"
                      >
                        <Mail size={16} />
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedOwner(owner);
                          setShowDetailsModal(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="View details"
                      >
                        <Edit size={16} />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteOwner(owner.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete platform owner"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 flex justify-between items-center border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * ownersPerPage + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * ownersPerPage, filteredOwners.length)}
                </span>{' '}
                of <span className="font-medium">{filteredOwners.length}</span> platform owners
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformOwners; 