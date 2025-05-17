import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { DollarSign, CreditCard, ChevronsRight, Clock, Check } from 'lucide-react';

const UserWithdraw: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank_transfer');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [platformInfo, setPlatformInfo] = useState<{name: string, slug: string, withdrawalLimit: number} | null>(null);
  const [availableBalance, setAvailableBalance] = useState(1250.75);
  
  const { currentUser } = useAuth();
  const { platformSlug } = useParams();

  useEffect(() => {
    // In a real app, we would fetch platform info and user balance from the backend
    if (platformSlug) {
      // Mock platform lookup
      setPlatformInfo({
        name: 'Lisa Sweeps',
        slug: platformSlug,
        withdrawalLimit: 1000
      });
    }
  }, [platformSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (Number(amount) > availableBalance) {
      toast.error('Withdrawal amount exceeds your available balance');
      return;
    }
    
    if (platformInfo && Number(amount) > platformInfo.withdrawalLimit) {
      toast.error(`Withdrawal amount exceeds platform limit of $${platformInfo.withdrawalLimit}`);
      return;
    }
    
    if (withdrawalMethod === 'bank_transfer' && (!accountNumber || !routingNumber || !accountName)) {
      toast.error('Please fill in all banking details');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real app, this would make an API call to request withdrawal
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsProcessing(false);
      setIsSuccess(true);
      toast.success(`Withdrawal request for $${amount} has been submitted`);
    } catch (error) {
      setIsProcessing(false);
      toast.error('Withdrawal request failed. Please try again.');
      console.error(error);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock size={32} className="text-warning-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Withdrawal Request Submitted</h2>
          <p className="text-gray-600 mt-2">
            Your withdrawal request of <span className="font-semibold">${amount}</span> is now pending approval.
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Amount:</span>
            <span className="font-medium">${amount}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Platform:</span>
            <span className="font-medium">{platformInfo?.name || 'Unknown'}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Method:</span>
            <span className="font-medium">
              {withdrawalMethod === 'bank_transfer' ? 'Bank Transfer' : 'Other'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Request ID:</span>
            <span className="font-medium text-xs">WDR-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
          </div>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Your withdrawal request will be reviewed by the platform administrator. You will be notified once it's approved.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => {
              setIsSuccess(false);
              setAmount('');
              setAccountNumber('');
              setRoutingNumber('');
              setAccountName('');
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors w-full"
          >
            Make Another Withdrawal Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign size={24} className="text-primary-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Withdraw from {platformInfo?.name || platformSlug}
        </h2>
        <p className="text-gray-600 mt-1">
          Request to withdraw funds from your account
        </p>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Your available balance is <span className="font-bold">${availableBalance.toFixed(2)}</span>. Withdrawal limit is <span className="font-bold">${platformInfo?.withdrawalLimit.toFixed(2) || '1,000.00'}</span>.
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Withdrawal Amount (USD)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0.00"
              min="1"
              step="0.01"
              max={Math.min(availableBalance, platformInfo?.withdrawalLimit || 1000)}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Withdrawal Method
          </label>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="flex items-center mb-4">
              <input
                id="bank_transfer"
                type="radio"
                name="withdrawalMethod"
                checked={withdrawalMethod === 'bank_transfer'}
                onChange={() => setWithdrawalMethod('bank_transfer')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <label htmlFor="bank_transfer" className="ml-2 block text-sm text-gray-700">
                Bank Transfer
              </label>
            </div>
            
            {withdrawalMethod === 'bank_transfer' && (
              <div className="pl-6 space-y-3">
                <div>
                  <label htmlFor="accountName" className="block text-xs text-gray-600 mb-1">Account Holder Name</label>
                  <input
                    id="accountName"
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="John Doe"
                    required={withdrawalMethod === 'bank_transfer'}
                  />
                </div>
                <div>
                  <label htmlFor="accountNumber" className="block text-xs text-gray-600 mb-1">Account Number</label>
                  <input
                    id="accountNumber"
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="12345678"
                    required={withdrawalMethod === 'bank_transfer'}
                  />
                </div>
                <div>
                  <label htmlFor="routingNumber" className="block text-xs text-gray-600 mb-1">Routing Number</label>
                  <input
                    id="routingNumber"
                    type="text"
                    value={routingNumber}
                    onChange={(e) => setRoutingNumber(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="123456789"
                    required={withdrawalMethod === 'bank_transfer'}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full flex items-center justify-center py-2 px-4 rounded-md text-white font-medium ${
              isProcessing
                ? 'bg-primary-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700'
            } transition-colors shadow-md`}
          >
            {isProcessing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>
                Request Withdrawal <ChevronsRight size={18} className="ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Note: All withdrawal requests are subject to review by the platform administrator.
          Processing may take 1-3 business days after approval.
        </p>
      </div>
    </div>
  );
};

export default UserWithdraw;