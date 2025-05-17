import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Save, 
  RefreshCw, 
  Settings,
  Mail,
  Server,
  Shield,
  DollarSign,
  Database,
  Bell,
  Clock,
  User,
  FileText
} from 'lucide-react';
import { toast } from 'react-toastify';

// Settings interface
interface SystemSettingsData {
  general: {
    systemName: string;
    supportEmail: string;
    maintenanceMode: boolean;
  };
  security: {
    mfaRequired: boolean;
    passwordExpiryDays: number;
    maxLoginAttempts: number;
    sessionTimeoutMinutes: number;
  };
  transactions: {
    defaultTransactionFee: number;
    withdrawalMinimumAmount: number;
    withdrawalProcessingDays: number;
    autoApproveVerifiedWithdrawals: boolean;
  };
  notifications: {
    emailNotificationsEnabled: boolean;
    smsNotificationsEnabled: boolean;
    notifyOnNewPlatform: boolean;
    notifyOnLargeTransactions: boolean;
  };
}

const SystemSettings: React.FC = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'transactions' | 'notifications'>('general');
  const [settings, setSettings] = useState<SystemSettingsData>({
    general: {
      systemName: 'Bolt Payment Platform',
      supportEmail: 'support@boltpayments.com',
      maintenanceMode: false
    },
    security: {
      mfaRequired: true,
      passwordExpiryDays: 90,
      maxLoginAttempts: 5,
      sessionTimeoutMinutes: 30
    },
    transactions: {
      defaultTransactionFee: 2.5,
      withdrawalMinimumAmount: 50,
      withdrawalProcessingDays: 2,
      autoApproveVerifiedWithdrawals: true
    },
    notifications: {
      emailNotificationsEnabled: true,
      smsNotificationsEnabled: false,
      notifyOnNewPlatform: true,
      notifyOnLargeTransactions: true
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, we would fetch settings from the API
      // For now, we'll use the initial state
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch settings', error);
      toast.error('Failed to load system settings');
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, we would save settings to the API
      toast.success('Settings saved successfully');
      setIsSaving(false);
    } catch (error) {
      console.error('Failed to save settings', error);
      toast.error('Failed to save settings');
      setIsSaving(false);
    }
  };

  // Handle input changes
  const handleInputChange = (
    section: keyof SystemSettingsData, 
    field: string, 
    value: string | number | boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Tabs content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="systemName" className="block text-sm font-medium text-gray-700 mb-1">
                System Name
              </label>
              <input
                type="text"
                id="systemName"
                value={settings.general.systemName}
                onChange={(e) => handleInputChange('general', 'systemName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Support Email
              </label>
              <input
                type="email"
                id="supportEmail"
                value={settings.general.supportEmail}
                onChange={(e) => handleInputChange('general', 'supportEmail', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="maintenanceMode"
                checked={settings.general.maintenanceMode}
                onChange={(e) => handleInputChange('general', 'maintenanceMode', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700">
                Maintenance Mode
              </label>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mfaRequired"
                checked={settings.security.mfaRequired}
                onChange={(e) => handleInputChange('security', 'mfaRequired', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="mfaRequired" className="ml-2 block text-sm text-gray-700">
                Require Multi-Factor Authentication
              </label>
            </div>
            
            <div>
              <label htmlFor="passwordExpiryDays" className="block text-sm font-medium text-gray-700 mb-1">
                Password Expiry (days)
              </label>
              <input
                type="number"
                id="passwordExpiryDays"
                min="0"
                max="365"
                value={settings.security.passwordExpiryDays}
                onChange={(e) => handleInputChange('security', 'passwordExpiryDays', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="maxLoginAttempts" className="block text-sm font-medium text-gray-700 mb-1">
                Max Login Attempts
              </label>
              <input
                type="number"
                id="maxLoginAttempts"
                min="1"
                max="10"
                value={settings.security.maxLoginAttempts}
                onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="sessionTimeoutMinutes" className="block text-sm font-medium text-gray-700 mb-1">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                id="sessionTimeoutMinutes"
                min="5"
                max="240"
                value={settings.security.sessionTimeoutMinutes}
                onChange={(e) => handleInputChange('security', 'sessionTimeoutMinutes', parseInt(e.target.value) || 30)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );
      
      case 'transactions':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="defaultTransactionFee" className="block text-sm font-medium text-gray-700 mb-1">
                Default Transaction Fee (%)
              </label>
              <input
                type="number"
                id="defaultTransactionFee"
                min="0"
                max="100"
                step="0.1"
                value={settings.transactions.defaultTransactionFee}
                onChange={(e) => handleInputChange('transactions', 'defaultTransactionFee', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="withdrawalMinimumAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Withdrawal Amount ($)
              </label>
              <input
                type="number"
                id="withdrawalMinimumAmount"
                min="0"
                step="1"
                value={settings.transactions.withdrawalMinimumAmount}
                onChange={(e) => handleInputChange('transactions', 'withdrawalMinimumAmount', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="withdrawalProcessingDays" className="block text-sm font-medium text-gray-700 mb-1">
                Withdrawal Processing Days
              </label>
              <input
                type="number"
                id="withdrawalProcessingDays"
                min="1"
                max="10"
                value={settings.transactions.withdrawalProcessingDays}
                onChange={(e) => handleInputChange('transactions', 'withdrawalProcessingDays', parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoApproveVerifiedWithdrawals"
                checked={settings.transactions.autoApproveVerifiedWithdrawals}
                onChange={(e) => handleInputChange('transactions', 'autoApproveVerifiedWithdrawals', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="autoApproveVerifiedWithdrawals" className="ml-2 block text-sm text-gray-700">
                Auto-approve Withdrawals for Verified Users
              </label>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotificationsEnabled"
                checked={settings.notifications.emailNotificationsEnabled}
                onChange={(e) => handleInputChange('notifications', 'emailNotificationsEnabled', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="emailNotificationsEnabled" className="ml-2 block text-sm text-gray-700">
                Enable Email Notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotificationsEnabled"
                checked={settings.notifications.smsNotificationsEnabled}
                onChange={(e) => handleInputChange('notifications', 'smsNotificationsEnabled', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="smsNotificationsEnabled" className="ml-2 block text-sm text-gray-700">
                Enable SMS Notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyOnNewPlatform"
                checked={settings.notifications.notifyOnNewPlatform}
                onChange={(e) => handleInputChange('notifications', 'notifyOnNewPlatform', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="notifyOnNewPlatform" className="ml-2 block text-sm text-gray-700">
                Notify on New Platform Registration
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyOnLargeTransactions"
                checked={settings.notifications.notifyOnLargeTransactions}
                onChange={(e) => handleInputChange('notifications', 'notifyOnLargeTransactions', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="notifyOnLargeTransactions" className="ml-2 block text-sm text-gray-700">
                Notify on Large Transactions
              </label>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
        <button
          onClick={saveSettings}
          disabled={isSaving}
          className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <RefreshCw size={16} className="mr-2 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" /> Save Changes
            </>
          )}
        </button>
      </div>
      
      {/* Settings Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-4 text-sm font-medium flex items-center ${
              activeTab === 'general'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings size={16} className="mr-2" /> General
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-4 text-sm font-medium flex items-center ${
              activeTab === 'security'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Shield size={16} className="mr-2" /> Security
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-4 text-sm font-medium flex items-center ${
              activeTab === 'transactions'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <DollarSign size={16} className="mr-2" /> Transactions
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-4 text-sm font-medium flex items-center ${
              activeTab === 'notifications'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Bell size={16} className="mr-2" /> Notifications
          </button>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
      
      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm">
        <p className="flex items-center">
          <FileText size={16} className="mr-2 flex-shrink-0" />
          <span>
            These settings apply system-wide to all platforms. Some settings may require a system restart to take effect.
          </span>
        </p>
      </div>
    </div>
  );
};

export default SystemSettings; 