import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { DollarSign, CreditCard, ChevronsRight, Check } from 'lucide-react';

// Mock Stripe Elements
const PaymentElement = () => (
  <div className="border border-gray-300 p-4 rounded-md">
    <div className="flex items-center justify-between mb-4">
      <label className="flex items-center">
        <input type="radio" name="payment" className="mr-2" defaultChecked />
        <span className="text-sm">Credit Card</span>
      </label>
      <div className="flex space-x-2">
        <div className="w-8 h-5 bg-blue-500 rounded"></div>
        <div className="w-8 h-5 bg-red-500 rounded"></div>
        <div className="w-8 h-5 bg-gray-300 rounded"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div>
        <label className="text-xs text-gray-600 mb-1 block">Card number</label>
        <div className="border border-gray-300 p-2 rounded-md bg-white">
          <div className="h-5 bg-gray-100 rounded w-full"></div>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="text-xs text-gray-600 mb-1 block">Expiration</label>
          <div className="border border-gray-300 p-2 rounded-md bg-white">
            <div className="h-5 bg-gray-100 rounded w-full"></div>
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-600 mb-1 block">CVC</label>
          <div className="border border-gray-300 p-2 rounded-md bg-white">
            <div className="h-5 bg-gray-100 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UserDeposit: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [platformInfo, setPlatformInfo] = useState<{name: string, slug: string} | null>(null);
  const { currentUser } = useAuth();
  const { platformSlug } = useParams();

  useEffect(() => {
    // In a real app, we would fetch platform info from the backend
    if (platformSlug) {
      // Mock platform lookup
      setPlatformInfo({
        name: 'Lisa Sweeps',
        slug: platformSlug
      });
    }
  }, [platformSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real app, this would make a call to Stripe
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsProcessing(false);
      setIsSuccess(true);
      toast.success(`Successfully deposited $${amount}`);
    } catch (error) {
      setIsProcessing(false);
      toast.error('Payment failed. Please try again.');
      console.error(error);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-success-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
          <p className="text-gray-600 mt-2">
            Your deposit of <span className="font-semibold">${amount}</span> has been processed successfully.
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
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Transaction ID:</span>
            <span className="font-medium text-xs">TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => {
              setIsSuccess(false);
              setAmount('');
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors w-full"
          >
            Make Another Deposit
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
          Deposit to {platformInfo?.name || platformSlug}
        </h2>
        <p className="text-gray-600 mt-1">
          Fund your account securely with your preferred payment method
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Deposit Amount (USD)
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
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <PaymentElement />
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
                Pay ${amount || '0.00'} <ChevronsRight size={18} className="ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <CreditCard size={16} className="mr-2" />
          <span>Secured by Stripe</span>
        </div>
      </div>
    </div>
  );
};

export default UserDeposit;