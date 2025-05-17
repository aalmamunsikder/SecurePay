import React, { useState, useEffect } from 'react';
import { 
  BarChart3,
  LineChart,
  PieChart,
  Download,
  Filter,
  Calendar,
  RefreshCw,
  FileText,
  ArrowDown,
  ArrowUp,
  CreditCard,
  Users,
  Activity,
  DollarSign
} from 'lucide-react';

interface ReportMetric {
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
}

interface TransactionData {
  date: string;
  amount: number;
}

interface PlatformData {
  name: string;
  transactions: number;
  volume: number;
}

interface UserSegment {
  segment: string;
  count: number;
  percentage: number;
}

const Reports: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reportType, setReportType] = useState<'transactions' | 'platforms' | 'users' | 'growth'>('transactions');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y' | 'custom'>('30d');
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10)
  });

  const [metrics, setMetrics] = useState<ReportMetric[]>([]);
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [platformData, setPlatformData] = useState<PlatformData[]>([]);
  const [userSegments, setUserSegments] = useState<UserSegment[]>([]);

  useEffect(() => {
    fetchReportData();
  }, [reportType, timeRange, dateRange]);

  const fetchReportData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Generate mock data based on report type
      generateMockData();
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching report data:', error);
      setIsLoading(false);
    }
  };

  const generateMockData = () => {
    // Generate mock metrics data
    const mockMetrics: ReportMetric[] = [
      {
        label: 'Total Transactions',
        value: Math.floor(Math.random() * 50000) + 10000,
        change: Math.floor(Math.random() * 30) + 1,
        changeType: Math.random() > 0.3 ? 'increase' : 'decrease'
      },
      {
        label: 'Total Volume',
        value: Math.floor(Math.random() * 1000000) + 500000,
        change: Math.floor(Math.random() * 25) + 1,
        changeType: Math.random() > 0.4 ? 'increase' : 'decrease'
      },
      {
        label: 'Active Platforms',
        value: Math.floor(Math.random() * 50) + 10,
        change: Math.floor(Math.random() * 15) + 1,
        changeType: Math.random() > 0.5 ? 'increase' : 'decrease'
      },
      {
        label: 'Total Users',
        value: Math.floor(Math.random() * 100000) + 25000,
        change: Math.floor(Math.random() * 20) + 1,
        changeType: Math.random() > 0.6 ? 'increase' : 'decrease'
      }
    ];
    setMetrics(mockMetrics);

    // Generate mock transaction data for line chart
    let days = 30;
    if (timeRange === '7d') days = 7;
    if (timeRange === '90d') days = 90;
    if (timeRange === '1y') days = 365;
    if (timeRange === 'custom') {
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);
      days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    }

    const mockTransactions: TransactionData[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      mockTransactions.push({
        date: date.toISOString().slice(0, 10),
        amount: Math.floor(Math.random() * 50000) + 5000
      });
    }
    setTransactionData(mockTransactions);

    // Generate mock platform data for bar chart
    const mockPlatforms: PlatformData[] = [];
    const platformNames = [
      'ShopEasy', 'QuickPay', 'EasyCart', 'FlexShop', 
      'PayFlex', 'GoodBuy', 'ShopNow', 'QuickShop', 
      'PayQuick', 'BuyEasy'
    ];
    
    for (let i = 0; i < 10; i++) {
      mockPlatforms.push({
        name: platformNames[i],
        transactions: Math.floor(Math.random() * 5000) + 500,
        volume: Math.floor(Math.random() * 100000) + 10000
      });
    }
    
    // Sort by volume desc
    mockPlatforms.sort((a, b) => b.volume - a.volume);
    setPlatformData(mockPlatforms);

    // Generate mock user segments for pie chart
    const totalUsers = Math.floor(Math.random() * 100000) + 50000;
    const mockSegments: UserSegment[] = [
      {
        segment: 'New Users',
        count: Math.floor(totalUsers * (Math.random() * 0.2 + 0.1)),
        percentage: 0
      },
      {
        segment: 'Active Users',
        count: Math.floor(totalUsers * (Math.random() * 0.3 + 0.4)),
        percentage: 0
      },
      {
        segment: 'Inactive Users',
        count: Math.floor(totalUsers * (Math.random() * 0.2 + 0.1)),
        percentage: 0
      },
      {
        segment: 'Suspended Users',
        count: Math.floor(totalUsers * (Math.random() * 0.1)),
        percentage: 0
      }
    ];
    
    // Calculate percentages
    mockSegments.forEach(segment => {
      segment.percentage = Math.round((segment.count / totalUsers) * 100);
    });
    
    setUserSegments(mockSegments);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format large numbers
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Update time range and date range
  const handleTimeRangeChange = (range: '7d' | '30d' | '90d' | '1y' | 'custom') => {
    setTimeRange(range);
    
    if (range !== 'custom') {
      const endDate = new Date();
      let startDate = new Date();
      
      switch (range) {
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
        case '1y':
          startDate.setDate(endDate.getDate() - 365);
          break;
      }
      
      setDateRange({
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10)
      });
    }
  };

  // Export report as CSV
  const exportReport = () => {
    let headers: string[] = [];
    let data: any[][] = [];
    let filename = '';
    
    switch (reportType) {
      case 'transactions':
        headers = ['Date', 'Transaction Volume'];
        data = transactionData.map(item => [item.date, item.amount]);
        filename = 'transaction_report';
        break;
      case 'platforms':
        headers = ['Platform', 'Transaction Count', 'Volume'];
        data = platformData.map(item => [item.name, item.transactions, item.volume]);
        filename = 'platform_report';
        break;
      case 'users':
        headers = ['Segment', 'User Count', 'Percentage'];
        data = userSegments.map(item => [item.segment, item.count, `${item.percentage}%`]);
        filename = 'user_segments_report';
        break;
      case 'growth':
        headers = ['Metric', 'Value', 'Change', 'Change Type'];
        data = metrics.map(item => [item.label, item.value, `${item.change}%`, item.changeType]);
        filename = 'growth_metrics_report';
        break;
    }
    
    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
        <button
          onClick={fetchReportData}
          className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-gray-200"
        >
          <RefreshCw size={16} className="mr-2" /> Refresh
        </button>
      </div>
      
      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Report Type Selector */}
          <div>
            <label htmlFor="reportType" className="block text-xs font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="transactions">Transaction Volume</option>
              <option value="platforms">Platform Performance</option>
              <option value="users">User Segments</option>
              <option value="growth">Growth Metrics</option>
            </select>
          </div>
          
          {/* Time Range Selector */}
          <div>
            <label htmlFor="timeRange" className="block text-xs font-medium text-gray-700 mb-1">
              Time Range
            </label>
            <select
              id="timeRange"
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          {/* Custom Date Range */}
          {timeRange === 'custom' && (
            <>
              <div>
                <label htmlFor="startDate" className="block text-xs font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-xs font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </>
          )}
          
          {/* Export Button */}
          <div className={`flex items-end ${timeRange === 'custom' ? 'col-span-full lg:col-span-1' : ''}`}>
            <button
              onClick={exportReport}
              className="w-full px-3 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <Download size={16} className="inline mr-1" /> Export Report
            </button>
          </div>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">{metric.label}</div>
              {/* Icon based on metric type */}
              {index === 0 && <CreditCard size={20} className="text-blue-500" />}
              {index === 1 && <DollarSign size={20} className="text-green-500" />}
              {index === 2 && <Activity size={20} className="text-purple-500" />}
              {index === 3 && <Users size={20} className="text-amber-500" />}
            </div>
            <div className="mt-2 flex items-end">
              <div className="text-2xl font-bold text-gray-800">
                {metric.label.includes('Volume') 
                  ? formatCurrency(metric.value) 
                  : formatNumber(metric.value)}
              </div>
              <div className={`ml-2 text-sm flex items-center ${
                metric.changeType === 'increase' ? 'text-green-600' : 
                metric.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
              }`}>
                {metric.changeType === 'increase' ? (
                  <ArrowUp size={16} className="mr-1" />
                ) : metric.changeType === 'decrease' ? (
                  <ArrowDown size={16} className="mr-1" />
                ) : null}
                {metric.change}%
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              vs. previous period
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Report Visualization */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {reportType === 'transactions' && (
          <div>
            <div className="flex items-center mb-4">
              <LineChart size={20} className="text-primary-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Transaction Volume Over Time</h2>
            </div>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded border border-gray-200">
              {/* This would be a real chart in production */}
              <div className="text-center">
                <p className="text-gray-500 mb-2">Transaction Volume Chart</p>
                <p className="text-sm text-gray-400">Line chart showing daily transaction volume</p>
                <p className="text-xs text-gray-400 mt-1">
                  Range: {dateRange.startDate} to {dateRange.endDate}
                </p>
                <div className="mt-4 h-40 px-8">
                  {/* Simple chart visualization */}
                  <div className="flex items-end h-full space-x-1">
                    {transactionData.slice(-20).map((item, index) => {
                      const height = (item.amount / 50000) * 100;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-primary-500 rounded-t"
                            style={{ height: `${height}%` }}
                          ></div>
                          {index % 5 === 0 && (
                            <div className="text-xs text-gray-500 mt-1 -rotate-45 origin-top-left">
                              {item.date.slice(5)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {reportType === 'platforms' && (
          <div>
            <div className="flex items-center mb-4">
              <BarChart3 size={20} className="text-primary-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Platform Performance</h2>
            </div>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded border border-gray-200">
              {/* This would be a real chart in production */}
              <div className="text-center w-full px-8">
                <p className="text-gray-500 mb-6">Top Platforms by Transaction Volume</p>
                
                {/* Simple bar chart visualization */}
                <div className="space-y-3">
                  {platformData.slice(0, 5).map((platform, index) => {
                    const width = (platform.volume / platformData[0].volume) * 100;
                    return (
                      <div key={index} className="flex items-center">
                        <div className="w-28 text-right pr-3 text-sm text-gray-600 truncate">
                          {platform.name}
                        </div>
                        <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary-500 rounded-full flex items-center pl-2"
                            style={{ width: `${width}%`, minWidth: '40px' }}
                          >
                            <span className="text-xs text-white">
                              {formatCurrency(platform.volume)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <p className="text-xs text-gray-400 mt-4">
                  Based on data from {dateRange.startDate} to {dateRange.endDate}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {reportType === 'users' && (
          <div>
            <div className="flex items-center mb-4">
              <PieChart size={20} className="text-primary-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">User Segments</h2>
            </div>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded border border-gray-200">
              {/* This would be a real chart in production */}
              <div className="text-center">
                <p className="text-gray-500 mb-4">User Distribution by Segment</p>
                
                <div className="flex justify-center mb-6">
                  {/* Simple pie chart visualization */}
                  <div className="w-40 h-40 rounded-full relative" style={{ 
                    background: `conic-gradient(
                      #4F46E5 0% ${userSegments[0].percentage}%, 
                      #10B981 ${userSegments[0].percentage}% ${userSegments[0].percentage + userSegments[1].percentage}%, 
                      #F59E0B ${userSegments[0].percentage + userSegments[1].percentage}% ${userSegments[0].percentage + userSegments[1].percentage + userSegments[2].percentage}%, 
                      #EF4444 ${userSegments[0].percentage + userSegments[1].percentage + userSegments[2].percentage}% 100%
                    )`
                  }}>
                    <div className="absolute inset-0 rounded-full bg-white m-2"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-lg font-bold text-gray-800">
                        {formatNumber(userSegments.reduce((sum, segment) => sum + segment.count, 0))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-6">
                  {userSegments.map((segment, index) => {
                    const colors = ['bg-indigo-500', 'bg-green-500', 'bg-amber-500', 'bg-red-500'];
                    return (
                      <div key={index} className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${colors[index]} mr-2`}></div>
                        <div>
                          <div className="text-xs text-gray-600">{segment.segment}</div>
                          <div className="text-sm font-medium text-gray-800">
                            {segment.percentage}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <p className="text-xs text-gray-400 mt-4">
                  Based on data from {dateRange.startDate} to {dateRange.endDate}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {reportType === 'growth' && (
          <div>
            <div className="flex items-center mb-4">
              <Activity size={20} className="text-primary-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Growth Metrics</h2>
            </div>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded border border-gray-200">
              {/* In a real app, this would show growth trends */}
              <div className="text-center">
                <p className="text-gray-500 mb-6">Growth Trends Analysis</p>
                
                <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
                  {metrics.map((metric, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-gray-700">{metric.label}</div>
                        <div className={`text-sm font-medium flex items-center ${
                          metric.changeType === 'increase' ? 'text-green-600' : 
                          metric.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {metric.changeType === 'increase' ? (
                            <ArrowUp size={16} className="mr-1" />
                          ) : metric.changeType === 'decrease' ? (
                            <ArrowDown size={16} className="mr-1" />
                          ) : null}
                          {metric.change}%
                        </div>
                      </div>
                      
                      <div className="text-lg font-bold text-gray-800">
                        {metric.label.includes('Volume') 
                          ? formatCurrency(metric.value) 
                          : formatNumber(metric.value)}
                      </div>
                      
                      {/* Simple growth indicator */}
                      <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            metric.changeType === 'increase' ? 'bg-green-500' : 
                            metric.changeType === 'decrease' ? 'bg-red-500' : 'bg-gray-400'
                          }`}
                          style={{ width: `${Math.min(metric.change * 2, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-xs text-gray-400 mt-6">
                  Comparing data between {dateRange.startDate} and {dateRange.endDate}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Additional notes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm">
        <p className="flex items-center">
          <FileText size={16} className="mr-2 flex-shrink-0" />
          <span>
            These reports provide a high-level overview of platform performance. For detailed analysis, export the report data or contact the analytics team.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Reports; 