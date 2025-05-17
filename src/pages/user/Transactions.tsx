import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Filter, 
  Search, 
  Calendar, 
  Download,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  DollarSign
} from 'lucide-react';

// Mock transaction type
interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method: string;
  description: string;
}

const UserTransactions: React.FC = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'deposit' | 'withdrawal'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{from: string, to: string}>({from: '', to: ''});

  useEffect(() => {
    // In a real app, fetch transactions from backend
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock transaction data
        const mockTransactions: Transaction[] = [
          {
            id: 'txn-1234',
            type: 'deposit',
            amount: 500.00,
            status: 'completed',
            date: '2023-06-15T10:30:00Z',
            method: 'Credit Card',
            description: 'Account funding'
          },
          {
            id: 'txn-1235',
            type: 'withdrawal',
            amount: 200.00,
            status: 'completed',
            date: '2023-06-10T14:20:00Z',
            method: 'Bank Transfer',
            description: 'Withdrawal to bank account'
          },
          {
            id: 'txn-1236',
            type: 'deposit',
            amount: 300.00,
            status: 'completed',
            date: '2023-05-28T09:15:00Z',
            method: 'Credit Card',
            description: 'Account funding'
          },
          {
            id: 'txn-1237',
            type: 'withdrawal',
            amount: 150.00,
            status: 'pending',
            date: '2023-06-18T16:45:00Z',
            method: 'Bank Transfer',
            description: 'Withdrawal processing'
          },
          {
            id: 'txn-1238',
            type: 'deposit',
            amount: 1000.00,
            status: 'completed',
            date: '2023-06-05T11:20:00Z',
            method: 'Bank Transfer',
            description: 'Large deposit'
          },
          {
            id: 'txn-1239',
            type: 'withdrawal',
            amount: 75.00,
            status: 'failed',
            date: '2023-06-12T08:30:00Z',
            method: 'Credit Card',
            description: 'Failed withdrawal attempt - insufficient funds'
          }
        ];
        
        setTransactions(mockTransactions);
      } catch (error) {
        toast.error('Failed to load transactions');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [currentUser]);

  // Filter transactions based on user filters
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by type
    if (filterType !== 'all' && transaction.type !== filterType) {
      return false;
    }
    
    // Filter by search query (case insensitive)
    if (searchQuery && 
        !transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !transaction.method.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by date range
    if (dateRange.from && new Date(transaction.date) < new Date(dateRange.from)) {
      return false;
    }
    if (dateRange.to && new Date(transaction.date) > new Date(dateRange.to)) {
      return false;
    }
    
    return true;
  });

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
    let Icon = Clock;
    
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

  const clearFilters = () => {
    setFilterType('all');
    setSearchQuery('');
    setDateRange({from: '', to: ''});
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
        <p className="text-gray-600 mt-1">Review your past deposits and withdrawals</p>
      </div>

      {/* Filters */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search size={16} className="text-gray-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions..."
                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposits</option>
              <option value="withdrawal">Withdrawals</option>
            </select>
            
            <button 
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-800 py-2 px-3 border border-gray-300 rounded-md"
            >
              Clear
            </button>

            <button className="bg-primary-50 text-primary-600 hover:bg-primary-100 py-2 px-3 rounded-md flex items-center">
              <Download size={16} className="mr-1" />
              Export
            </button>
          </div>
        </div>
        
        <div className="mt-3 flex flex-col sm:flex-row gap-3">
          <div className="flex items-center">
            <label htmlFor="date-from" className="text-sm text-gray-600 mr-2">From:</label>
            <input
              id="date-from"
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
              className="text-sm py-1 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center">
            <label htmlFor="date-to" className="text-sm text-gray-600 mr-2">To:</label>
            <input
              id="date-to"
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
              className="text-sm py-1 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="overflow-x-auto">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Search size={24} className="text-gray-400" />
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
                  Type
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`rounded-full p-2 mr-3 ${
                        transaction.type === 'deposit' 
                          ? 'bg-success-50 text-success-600' 
                          : 'bg-primary-50 text-primary-600'
                      }`}>
                        {transaction.type === 'deposit' ? (
                          <ArrowDownLeft size={16} />
                        ) : (
                          <ArrowUpRight size={16} />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {transaction.id}
                        </div>
                      </div>
                    </div>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserTransactions; 