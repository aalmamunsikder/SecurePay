import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import {
  Search,
  Filter,
  User,
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  CreditCard,
  DollarSign,
  Eye,
  XCircle,
  Building2,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Mock withdrawal request type
interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  method: string;
  accountDetails: string;
  reason?: string;
}

const WithdrawalRequests: React.FC = () => {
  const { currentUser } = useAuth();
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<WithdrawalRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const requestsPerPage = 10;

  useEffect(() => {
    const fetchWithdrawals = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock withdrawal requests
        const mockWithdrawals: WithdrawalRequest[] = Array.from({ length: 30 }, (_, i) => {
          const statuses: ('pending' | 'approved' | 'rejected')[] = ['pending', 'approved', 'rejected'];
          // Most should be pending to simulate needing approval
          const randomStatus = statuses[Math.floor(Math.random() * (i < 20 ? 1 : 3))];
          
          const methods = ['Bank Transfer', 'PayPal', 'Cryptocurrency'];
          const randomMethod = methods[Math.floor(Math.random() * methods.length)];
          
          const names = [`John Smith`, `Maria Garcia`, `James Johnson`, `Li Wei`, `Sarah Brown`, 
                    `Ahmed Khan`, `Emily Davis`, `Michael Wilson`, `Sofia Martinez`, `Raj Patel`];
          const randomName = names[Math.floor(Math.random() * names.length)];
          
          // Generate a random date in the last 7 days
          const randomDate = new Date();
          randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 7));
          
          // Mock account details
          let accountDetails = '';
          if (randomMethod === 'Bank Transfer') {
            accountDetails = `Bank: ${['Chase', 'Bank of America', 'Wells Fargo'][Math.floor(Math.random() * 3)]}\nAccount: ****${Math.floor(1000 + Math.random() * 9000)}`;
          } else if (randomMethod === 'PayPal') {
            accountDetails = `${randomName.toLowerCase().replace(' ', '.')}@example.com`;
          } else {
            accountDetails = `Wallet: 0x${Math.random().toString(16).substring(2, 14)}...`;
          }
          
          return {
            id: `wdr-${i + 2000}`,
            userId: `user-${i % 10 + 100}`,
            userName: randomName,
            userEmail: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
            amount: Math.floor(Math.random() * 100000) / 100 + 50, // Random amount between 50 and 1050
            status: randomStatus,
            date: randomDate.toISOString(),
            method: randomMethod,
            accountDetails,
            reason: randomStatus === 'rejected' ? 
              ['Insufficient funds', 'Invalid account details', 'Suspicious activity'][Math.floor(Math.random() * 3)] : 
              undefined
          };
        });
        
        // Sort by date (newest first)
        mockWithdrawals.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setWithdrawals(mockWithdrawals);
      } catch (error) {
        toast.error('Failed to load withdrawal requests');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWithdrawals();
  }, []);

  // Filter withdrawals based on filters
  const filteredRequests = withdrawals.filter(request => {
    // Filter by status
    if (statusFilter !== 'all' && request.status !== statusFilter) {
      return false;
    }
    
    // Filter by search query (case insensitive)
    if (searchQuery && 
        !request.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !request.userName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !request.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !request.method.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);
  const currentRequests = filteredRequests.slice(
    (currentPage - 1) * requestsPerPage,
    currentPage * requestsPerPage
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: WithdrawalRequest['status'] }) => {
    let colorClass = '';
    let Icon = Clock;
    
    switch (status) {
      case 'approved':
        colorClass = 'bg-success-100 text-success-800';
        Icon = CheckCircle;
        break;
      case 'pending':
        colorClass = 'bg-warning-100 text-warning-800';
        Icon = Clock;
        break;
      case 'rejected':
        colorClass = 'bg-error-100 text-error-800';
        Icon = XCircle;
        break;
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
        <Icon size={12} className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleRequestAction = (action: 'view' | 'approve' | 'reject', request: WithdrawalRequest) => {
    setSelectedRequest(request);
    
    switch (action) {
      case 'view':
        setIsModalOpen(true);
        break;
      case 'approve':
        // In a real app, this would show a confirmation modal
        handleApproveRequest(request);
        break;
      case 'reject':
        // Show modal for rejection reason
        setIsModalOpen(true);
        setRejectReason('');
        break;
    }
  };

  const handleApproveRequest = async (request: WithdrawalRequest) => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the withdrawal request in the list
      setWithdrawals(prevRequests => 
        prevRequests.map(r => 
          r.id === request.id ? { ...r, status: 'approved' } : r
        )
      );
      
      toast.success(`Withdrawal request ${request.id} has been approved`);
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to approve withdrawal request');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectRequest = async () => {
    if (!selectedRequest) return;
    
    if (!rejectReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the withdrawal request in the list
      setWithdrawals(prevRequests => 
        prevRequests.map(r => 
          r.id === selectedRequest.id ? { ...r, status: 'rejected', reason: rejectReason } : r
        )
      );
      
      toast.success(`Withdrawal request ${selectedRequest.id} has been rejected`);
      setIsModalOpen(false);
      setRejectReason('');
    } catch (error) {
      toast.error('Failed to reject withdrawal request');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const downloadWithdrawals = () => {
    toast.info('Withdrawal requests would be downloaded as CSV');
    // In a real app, this would generate and download a CSV file
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="space-y-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Withdrawal Requests</h1>
        <button 
          onClick={downloadWithdrawals}
          className="bg-primary-50 text-primary-600 hover:bg-primary-100 py-2 px-4 rounded-md text-sm font-medium flex items-center"
        >
          <Download size={16} className="mr-2" />
          Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-warning-100 p-3 rounded-full mr-4">
              <Clock size={24} className="text-warning-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="text-2xl font-bold text-gray-900">
                {withdrawals.filter(w => w.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-success-100 p-3 rounded-full mr-4">
              <CheckCircle size={24} className="text-success-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Approved</h3>
              <p className="text-2xl font-bold text-gray-900">
                {withdrawals.filter(w => w.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-error-100 p-3 rounded-full mr-4">
              <XCircle size={24} className="text-error-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
              <p className="text-2xl font-bold text-gray-900">
                {withdrawals.filter(w => w.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4">
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
                  placeholder="Search by ID, user, or method..."
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
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              
              <button 
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-800 py-2 px-3 border border-gray-300 rounded-md flex items-center"
              >
                <RefreshCw size={14} className="mr-1" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawals Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          {currentRequests.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mb-4">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <DollarSign size={24} className="text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">No withdrawal requests found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {request.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {request.userName}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{request.userEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-primary-600">
                      ${request.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        {request.method === 'Bank Transfer' ? (
                          <Building2 size={14} className="mr-1" />
                        ) : request.method === 'PayPal' ? (
                          <DollarSign size={14} className="mr-1" />
                        ) : (
                          <CreditCard size={14} className="mr-1" />
                        )}
                        {request.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(request.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleRequestAction('view', request)}
                          className="text-gray-600 hover:text-gray-900 p-1"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                        
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleRequestAction('approve', request)}
                              className="text-success-600 hover:text-success-900 p-1"
                              title="Approve withdrawal"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              onClick={() => handleRequestAction('reject', request)}
                              className="text-error-600 hover:text-error-900 p-1"
                              title="Reject withdrawal"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * requestsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * requestsPerPage, filteredRequests.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredRequests.length}</span> results
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
          </div>
        )}
      </div>

      {/* Modal - In a real app, this would be a proper modal component */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedRequest.status === 'pending' && rejectReason !== '' ? 
                  'Reject Withdrawal' : 
                  'Withdrawal Details'
                }
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setRejectReason('');
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            
            {selectedRequest.status === 'pending' && rejectReason !== '' ? (
              // Rejection Form
              <div className="p-6">
                <h4 className="font-medium text-gray-800 mb-2">
                  Reason for rejection
                </h4>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                  placeholder="Please provide a reason for rejecting this withdrawal request..."
                  required
                ></textarea>
                
                <div className="mt-6 flex space-x-2 justify-end">
                  <button
                    onClick={() => {
                      setRejectReason('');
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectRequest}
                    className="px-4 py-2 bg-error-600 text-white rounded-md text-sm font-medium hover:bg-error-700"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Reject Withdrawal'}
                  </button>
                </div>
              </div>
            ) : (
              // Withdrawal Details
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Withdrawal ID</h4>
                    <p className="font-mono">{selectedRequest.id}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">User</h4>
                    <p>{selectedRequest.userName} ({selectedRequest.userEmail})</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Amount</h4>
                    <p className="text-lg font-bold text-primary-600">
                      ${selectedRequest.amount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Method</h4>
                    <p>{selectedRequest.method}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Account Details</h4>
                    <p className="whitespace-pre-line">{selectedRequest.accountDetails}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                    <StatusBadge status={selectedRequest.status} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date</h4>
                    <p>{formatDate(selectedRequest.date)}</p>
                  </div>
                  
                  {selectedRequest.reason && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Rejection Reason</h4>
                      <p className="text-error-600">{selectedRequest.reason}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex space-x-2 justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  
                  {selectedRequest.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApproveRequest(selectedRequest)}
                        className="px-4 py-2 bg-success-600 text-white rounded-md text-sm font-medium hover:bg-success-700"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => setRejectReason(' ')} // Space to trigger the form view
                        className="px-4 py-2 bg-error-600 text-white rounded-md text-sm font-medium hover:bg-error-700"
                        disabled={isProcessing}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalRequests; 