import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  DollarSign, 
  TrendingUp, 
  ArrowDown, 
  ArrowUp, 
  Download, 
  Calendar, 
  Filter,
  ChevronDown,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

// Types for financial data
interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  transactionFees: number;
  withdrawalFees: number;
  operationalCosts: number;
  monthlyGrowth: number;
}

interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface RevenueBreakdown {
  transactionFees: number;
  withdrawalFees: number;
  subscriptionFees: number;
  otherIncome: number;
}

interface ExpenseBreakdown {
  paymentProcessing: number;
  staff: number;
  marketing: number;
  infrastructure: number;
  other: number;
}

const PlatformFinancials: React.FC = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [year, setYear] = useState(new Date().getFullYear());
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [revenueBreakdown, setRevenueBreakdown] = useState<RevenueBreakdown | null>(null);
  const [expenseBreakdown, setExpenseBreakdown] = useState<ExpenseBreakdown | null>(null);
  const [showRevenueDetails, setShowRevenueDetails] = useState(false);
  const [showExpenseDetails, setShowExpenseDetails] = useState(false);

  useEffect(() => {
    fetchFinancialData();
  }, [period, year]);

  const fetchFinancialData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock financial summary
      const mockSummary: FinancialSummary = {
        totalRevenue: 125000,
        totalExpenses: 78500,
        netProfit: 46500,
        transactionFees: 85000,
        withdrawalFees: 32000,
        operationalCosts: 78500,
        monthlyGrowth: 5.2
      };
      
      // Mock monthly data
      const mockMonthlyData: MonthlyData[] = [
        { month: 'Jan', revenue: 9500, expenses: 6200, profit: 3300 },
        { month: 'Feb', revenue: 10200, expenses: 6500, profit: 3700 },
        { month: 'Mar', revenue: 11000, expenses: 6800, profit: 4200 },
        { month: 'Apr', revenue: 10800, expenses: 6600, profit: 4200 },
        { month: 'May', revenue: 11500, expenses: 7000, profit: 4500 },
        { month: 'Jun', revenue: 12000, expenses: 7200, profit: 4800 },
        { month: 'Jul', revenue: 12500, expenses: 7500, profit: 5000 },
        { month: 'Aug', revenue: 13000, expenses: 7800, profit: 5200 },
        { month: 'Sep', revenue: 13500, expenses: 8000, profit: 5500 },
        { month: 'Oct', revenue: 14000, expenses: 8200, profit: 5800 },
        { month: 'Nov', revenue: 14500, expenses: 8500, profit: 6000 },
        { month: 'Dec', revenue: 15000, expenses: 8700, profit: 6300 }
      ];
      
      // Mock revenue breakdown
      const mockRevenueBreakdown: RevenueBreakdown = {
        transactionFees: 68,
        withdrawalFees: 25,
        subscriptionFees: 5,
        otherIncome: 2
      };
      
      // Mock expense breakdown
      const mockExpenseBreakdown: ExpenseBreakdown = {
        paymentProcessing: 45,
        staff: 30,
        marketing: 15,
        infrastructure: 7,
        other: 3
      };
      
      setFinancialSummary(mockSummary);
      setMonthlyData(mockMonthlyData);
      setRevenueBreakdown(mockRevenueBreakdown);
      setExpenseBreakdown(mockExpenseBreakdown);
    } catch (error) {
      console.error('Failed to fetch financial data', error);
      toast.error('Failed to load financial data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const downloadReport = () => {
    toast.info('Financial report download would start here');
    // In a real app, this would generate and download a financial report
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Financial Reports</h1>
        
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setPeriod('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                period === 'monthly'
                  ? 'bg-primary-50 text-primary-700 border-primary-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod('quarterly')}
              className={`px-4 py-2 text-sm font-medium border-t border-b ${
                period === 'quarterly'
                  ? 'bg-primary-50 text-primary-700 border-primary-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Quarterly
            </button>
            <button
              onClick={() => setPeriod('yearly')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                period === 'yearly'
                  ? 'bg-primary-50 text-primary-700 border-primary-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Yearly
            </button>
          </div>
          
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
          </select>
          
          <button
            onClick={downloadReport}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <Download size={16} className="mr-2" />
            Download Report
          </button>
        </div>
      </div>
      
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
            <div className="rounded-full bg-success-100 p-2">
              <DollarSign size={18} className="text-success-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(financialSummary?.totalRevenue || 0)}</p>
            <div className="flex items-center mt-2">
              <span className="text-success-600 text-sm flex items-center font-medium">
                <ArrowUp size={14} className="mr-1" />
                {financialSummary?.monthlyGrowth}% 
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last period</span>
            </div>
          </div>
          <button
            onClick={() => setShowRevenueDetails(!showRevenueDetails)}
            className="mt-4 text-sm text-primary-600 flex items-center"
          >
            {showRevenueDetails ? 'Hide' : 'Show'} breakdown
            <ChevronDown size={14} className={`ml-1 transform ${showRevenueDetails ? 'rotate-180' : ''}`} />
          </button>
          {showRevenueDetails && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Transaction Fees</span>
                <span className="text-gray-800 font-medium">{revenueBreakdown?.transactionFees}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Withdrawal Fees</span>
                <span className="text-gray-800 font-medium">{revenueBreakdown?.withdrawalFees}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Subscription Fees</span>
                <span className="text-gray-800 font-medium">{revenueBreakdown?.subscriptionFees}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Other Income</span>
                <span className="text-gray-800 font-medium">{revenueBreakdown?.otherIncome}%</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Total Expenses */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Expenses</h3>
            <div className="rounded-full bg-warning-100 p-2">
              <CreditCard size={18} className="text-warning-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(financialSummary?.totalExpenses || 0)}</p>
            <div className="flex items-center mt-2">
              <span className="text-warning-600 text-sm flex items-center font-medium">
                <ArrowUp size={14} className="mr-1" />
                3.2%
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last period</span>
            </div>
          </div>
          <button
            onClick={() => setShowExpenseDetails(!showExpenseDetails)}
            className="mt-4 text-sm text-primary-600 flex items-center"
          >
            {showExpenseDetails ? 'Hide' : 'Show'} breakdown
            <ChevronDown size={14} className={`ml-1 transform ${showExpenseDetails ? 'rotate-180' : ''}`} />
          </button>
          {showExpenseDetails && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Payment Processing</span>
                <span className="text-gray-800 font-medium">{expenseBreakdown?.paymentProcessing}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Staff</span>
                <span className="text-gray-800 font-medium">{expenseBreakdown?.staff}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Marketing</span>
                <span className="text-gray-800 font-medium">{expenseBreakdown?.marketing}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Infrastructure</span>
                <span className="text-gray-800 font-medium">{expenseBreakdown?.infrastructure}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Other</span>
                <span className="text-gray-800 font-medium">{expenseBreakdown?.other}%</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Net Profit */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Net Profit</h3>
            <div className="rounded-full bg-primary-100 p-2">
              <TrendingUp size={18} className="text-primary-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(financialSummary?.netProfit || 0)}</p>
            <div className="flex items-center mt-2">
              <span className="text-success-600 text-sm flex items-center font-medium">
                <ArrowUp size={14} className="mr-1" />
                8.5%
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last period</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Profit Margin</span>
              <span className="text-gray-800 font-medium">
                {financialSummary ? ((financialSummary.netProfit / financialSummary.totalRevenue) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary-600 h-2.5 rounded-full" 
                style={{ width: `${financialSummary ? ((financialSummary.netProfit / financialSummary.totalRevenue) * 100) : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Monthly Revenue/Expense Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-gray-800">Revenue vs Expenses</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="h-3 w-3 bg-primary-500 rounded-full mr-2"></span>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 bg-warning-500 rounded-full mr-2"></span>
              <span className="text-sm text-gray-600">Expenses</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 bg-success-500 rounded-full mr-2"></span>
              <span className="text-sm text-gray-600">Profit</span>
            </div>
          </div>
        </div>
        
        {/* Chart Placeholder */}
        <div className="relative">
          <div className="h-64 flex items-end border-b border-l border-gray-200">
            {monthlyData.map((data, index) => (
              <div 
                key={index} 
                className="flex-1 flex flex-col items-center justify-end h-full"
              >
                {/* Profit Bar */}
                <div className="w-6 bg-success-500 rounded-t" style={{ height: `${(data.profit / 15000) * 100}%` }}></div>
                
                {/* Expense Bar */}
                <div className="w-6 bg-warning-500 rounded-t mt-1" style={{ height: `${(data.expenses / 15000) * 100}%` }}></div>
                
                {/* Revenue Bar */}
                <div className="w-6 bg-primary-500 rounded-t mt-1" style={{ height: `${(data.revenue / 15000) * 100}%` }}></div>
                
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2 -ml-10">
            <span className="text-xs text-gray-500">$15K</span>
            <span className="text-xs text-gray-500">$10K</span>
            <span className="text-xs text-gray-500">$5K</span>
            <span className="text-xs text-gray-500">$0</span>
          </div>
        </div>
        
        {/* Hover tooltip would go here in a real app */}
      </div>
      
      {/* Financial Insights */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Financial Insights</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-success-100 p-2 rounded-full mr-3">
              <TrendingUp size={18} className="text-success-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Revenue Growth</h4>
              <p className="text-sm text-gray-600 mt-1">
                Your platform's revenue has grown by 5.2% compared to last month. Transaction fees continue to be your main revenue source.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-warning-100 p-2 rounded-full mr-3">
              <AlertCircle size={18} className="text-warning-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Expense Monitoring</h4>
              <p className="text-sm text-gray-600 mt-1">
                Payment processing costs have increased by 3.2%. Consider negotiating better rates with your payment processors to improve margins.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-primary-100 p-2 rounded-full mr-3">
              <BarChart3 size={18} className="text-primary-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Profit Optimization</h4>
              <p className="text-sm text-gray-600 mt-1">
                Your profit margin of {financialSummary ? ((financialSummary.netProfit / financialSummary.totalRevenue) * 100).toFixed(1) : 0}% is healthy. Focus on scaling user acquisition while maintaining operational efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Projected Earnings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Projected Earnings (Next Quarter)</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projected Revenue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projected Expenses
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projected Profit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  January
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(15500)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(9000)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(6500)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-success-600 text-sm flex items-center font-medium">
                    <ArrowUp size={14} className="mr-1" />
                    3.2%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  February
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(16000)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(9200)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(6800)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-success-600 text-sm flex items-center font-medium">
                    <ArrowUp size={14} className="mr-1" />
                    4.6%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  March
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(16500)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(9400)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(7100)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-success-600 text-sm flex items-center font-medium">
                    <ArrowUp size={14} className="mr-1" />
                    4.4%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlatformFinancials; 