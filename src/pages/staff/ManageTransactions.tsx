import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import {
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  User,
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  CreditCard,
  DollarSign,
  Eye,
  XCircle,
  Calendar,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Mock transaction type
interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method: string;
  description: string;
}

const ManageTransactions: React.FC = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'deposit' | 'withdrawal'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [dateRange, setDateRange] = useState<{from: string, to: string}>({from: '', to: ''});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock transactions
        const mockTransactions: Transaction[] = Array.from({ length: 50 }, (_, i) => {
          const types: ('deposit' | 'withdrawal')[] = ['deposit', 'withdrawal'];
          const randomType = types[Math.floor(Math.random() * 2)];
          
          const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'pending', 'failed'];
          // Most transactions should be completed
          const randomStatus = statuses[Math.floor(Math.random() * (i < 40 ? 1 : 3))];
          
          const methods = ['Credit Card', 'Bank Transfer', 'PayPal', 'Cryptocurrency'];
          const randomMethod = methods[Math.floor(Math.random() * methods.length)];
          
          const names = [`John Smith`, `Maria Garcia`, `James Johnson`, `Li Wei`, `Sarah Brown`, 
                    `Ahmed Khan`, `Emily Davis`, `Michael Wilson`, `Sofia Martinez`, `Raj Patel`];
          const randomName = names[Math.floor(Math.random() * names.length)];
          
          // Generate a random date in the last 30 days
          const randomDate = new Date();
          randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
          
          return {
            id: `txn-${i + 1000}`,
            userId: `user-${i % 10 + 100}`,
            userName: randomName,
            userEmail: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
            type: randomType,
            amount: Math.floor(Math.random() * 100000) / 100, // Random amount between 0 and 1000
            status: randomStatus,
            date: randomDate.toISOString(),
            method: randomMethod,
            description: randomType === 'deposit' 
              ? 'Account funding' 
              : 'Withdrawal to bank account'
          };
        });
        
        // Sort by date (newest first)
        mockTransactions.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setTransactions(mockTransactions);
      } catch (error) {
        toast.error('Failed to load transactions');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Filter transactions based on filters
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by type
    if (typeFilter !== 'all' && transaction.type !== typeFilter) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== 'all' && transaction.status !== statusFilter) {
      return false;
    }
    
    // Filter by search query (case insensitive)
    if (searchQuery && 
        !transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !transaction.userName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !transaction.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by date range
    if (dateRange.from && new Date(transaction.date) < new Date(dateRange.from)) {
      return false;
    }
    if (dateRange.to) {
      const toDate = new Date(dateRange.to);
      toDate.setHours(23, 59, 59, 999); // End of the day
      if (new Date(transaction.date) > toDate) {
        return false;
      }
    }
    
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
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
  const StatusBadge = ({ status }: { status: Transaction['status'] }) => {
    let colorClass = '';
    let Icon = CheckCircle;
    
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

  const handleTransactionAction = (action: 'view' | 'approve' | 'reject', transaction: Transaction) => {
    setSelectedTransaction(transaction);
    
    switch (action) {
      case 'view':
        setIsModalOpen(true);
        break;
      case 'approve':
        // Simulate API call
        toast.success(`Transaction ${transaction.id} has been approved`);
        // In a real app, you would call an API and then update the transactions list
        setTransactions(prevTransactions => 
          prevTransactions.map(t => 
            t.id === transaction.id ? { ...t, status: 'completed' } : t
          )
        );
        break;
      case 'reject':
        // Simulate API call
        toast.success(`Transaction ${transaction.id} has been rejected`);
        // In a real app, you would call an API and then update the transactions list
        setTransactions(prevTransactions => 
          prevTransactions.map(t => 
            t.id === transaction.id ? { ...t, status: 'failed' } : t
          )
        );
        break;
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setStatusFilter('all');
    setDateRange({from: '', to: ''});
    setCurrentPage(1);
  };

  const downloadTransactions = () => {
    toast.info('Transactions would be downloaded as CSV');
    // In a real app, this would generate and download a CSV file
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
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
        <h1 className="text-2xl font-bold text-gray-800">Manage Transactions</h1>
        <button 
          onClick={downloadTransactions}
          className="bg-primary-50 text-primary-600 hover:bg-primary-100 py-2 px-4 rounded-md text-sm font-medium flex items-center"
        >
          <Download size={16} className="mr-2" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
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
                  placeholder="Search transactions by ID, user, or description..."
                  className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
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
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <label htmlFor="date-from" className="text-sm text-gray-600 mr-2">From:</label>
              <input
                id="date-from"
                type="date"
                value={dateRange.from}
                onChange={(e) => {
                  setDateRange(prev => ({...prev, from: e.target.value}));
                  setCurrentPage(1);
                }}
                className="text-sm py-1 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center">
              <label htmlFor="date-to" className="text-sm text-gray-600 mr-2">To:</label>
              <input
                id="date-to"
                type="date"
                value={dateRange.to}
                onChange={(e) => {
                  setDateRange(prev => ({...prev, to: e.target.value}));
                  setCurrentPage(1);
                }}
                className="text-sm py-1 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          {currentTransactions.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mb-4">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <DollarSign size={24} className="text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">No transactions found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </div>
          ) : (
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
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`rounded-full p-2 mr-3 ${
                          transaction.type === 'deposit' 
                            ? 'bg-success-100 text-success-600' 
                            : 'bg-primary-100 text-primary-600'
                        }`}>
                          {transaction.type === 'deposit' ? (
                            <ArrowDownLeft size={16} />
                          ) : (
                            <ArrowUpRight size={16} />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {transaction.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.userName}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{transaction.userEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`font-medium ${
                        transaction.type === 'deposit' 
                          ? 'text-success-600' 
                          : 'text-primary-600'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={transaction.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        {transaction.method.includes('Card') ? (
                          <CreditCard size={14} className="mr-1" />
                        ) : (
                          <DollarSign size={14} className="mr-1" />
                        )}
                        {transaction.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleTransactionAction('view', transaction)}
                          className="text-gray-600 hover:text-gray-900 p-1"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                        
                        {transaction.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleTransactionAction('approve', transaction)}
                              className="text-success-600 hover:text-success-900 p-1"
                              title="Approve transaction"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              onClick={() => handleTransactionAction('reject', transaction)}
                              className="text-error-600 hover:text-error-900 p-1"
                              title="Reject transaction"
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
                  Showing <span className="font-medium">{(currentPage - 1) * transactionsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * transactionsPerPage, filteredTransactions.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredTransactions.length}</span> results
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

      {/* Transaction Details Modal - In a real app, this would be a proper modal */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Transaction Details</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Transaction ID</h4>
                  <p className="font-mono">{selectedTransaction.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">User</h4>
                  <p>{selectedTransaction.userName} ({selectedTransaction.userEmail})</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Type</h4>
                  <p className={selectedTransaction.type === 'deposit' ? 'text-success-600' : 'text-primary-600'}>
                    {selectedTransaction.type.charAt(0).toUpperCase() + selectedTransaction.type.slice(1)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Amount</h4>
                  <p className="text-lg font-bold">
                    ${selectedTransaction.amount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <StatusBadge status={selectedTransaction.status} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date</h4>
                  <p>{formatDate(selectedTransaction.date)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Method</h4>
                  <p>{selectedTransaction.method}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Description</h4>
                  <p>{selectedTransaction.description}</p>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-2 justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedTransaction.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleTransactionAction('approve', selectedTransaction);
                        setIsModalOpen(false);
                      }}
                      className="px-4 py-2 bg-success-600 text-white rounded-md text-sm font-medium hover:bg-success-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleTransactionAction('reject', selectedTransaction);
                        setIsModalOpen(false);
                      }}
                      className="px-4 py-2 bg-error-600 text-white rounded-md text-sm font-medium hover:bg-error-700"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTransactions; 