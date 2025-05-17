import React, { useState, useEffect } from 'react';
import { 
  Plugin, 
  Check, 
  AlertTriangle, 
  XCircle, 
  RefreshCw, 
  FileText, 
  Link, 
  Globe, 
  Database, 
  Lock, 
  Mail, 
  MessageSquare, 
  CreditCard,
  Plus,
  Trash2,
  RefreshCcw,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'react-toastify';

interface Integration {
  id: string;
  name: string;
  description: string;
  type: 'payment' | 'analytics' | 'email' | 'messaging' | 'security' | 'other';
  status: 'active' | 'inactive' | 'error' | 'pending';
  lastSync?: Date;
  apiKey?: string;
  webhook?: string;
  configOptions?: Record<string, string>;
}

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [newConfigKey, setNewConfigKey] = useState('');
  const [newConfigValue, setNewConfigValue] = useState('');

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockIntegrations: Integration[] = [
        {
          id: '1',
          name: 'Stripe',
          description: 'Payment processor for credit card transactions and subscriptions',
          type: 'payment',
          status: 'active',
          lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
          apiKey: 'sk_test_51HZL3GJYK36237aBcDeFgHiJkLmNo71234567890',
          webhook: 'https://api.example.com/webhooks/stripe',
          configOptions: {
            'mode': 'live',
            'currency': 'USD',
            'auto_capture': 'true'
          }
        },
        {
          id: '2',
          name: 'PayPal',
          description: 'Payment gateway for PayPal transactions',
          type: 'payment',
          status: 'active',
          lastSync: new Date(Date.now() - 8 * 60 * 60 * 1000),
          apiKey: 'live_kP5z8YxRsT1u2V3w4X5y6Z7a8B9c0D1e',
          webhook: 'https://api.example.com/webhooks/paypal',
          configOptions: {
            'mode': 'live',
            'currency': 'USD'
          }
        },
        {
          id: '3',
          name: 'Google Analytics',
          description: 'Web analytics service for tracking website traffic',
          type: 'analytics',
          status: 'active',
          lastSync: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          apiKey: 'UA-12345678-9',
          configOptions: {
            'track_users': 'true',
            'anonymize_ip': 'true'
          }
        },
        {
          id: '4',
          name: 'Mailchimp',
          description: 'Email marketing platform for newsletters and campaigns',
          type: 'email',
          status: 'inactive',
          lastSync: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          apiKey: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
          webhook: 'https://api.example.com/webhooks/mailchimp'
        },
        {
          id: '5',
          name: 'Twilio',
          description: 'Communication API for SMS and voice messaging',
          type: 'messaging',
          status: 'error',
          lastSync: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          apiKey: 'abc123def456ghi789jkl012mno345pqr',
          configOptions: {
            'from_number': '+15551234567'
          }
        },
        {
          id: '6',
          name: 'Auth0',
          description: 'Identity and access management platform',
          type: 'security',
          status: 'active',
          lastSync: new Date(Date.now() - 12 * 60 * 60 * 1000),
          apiKey: 'auth0_client_secret_abcdefghijklmnopqrstuvwxyz',
          configOptions: {
            'domain': 'example.auth0.com',
            'client_id': 'auth0_client_id_123456789'
          }
        },
        {
          id: '7',
          name: 'Segment',
          description: 'Customer data platform for collecting, cleaning and controlling customer data',
          type: 'analytics',
          status: 'pending',
          configOptions: {}
        }
      ];
      
      setIntegrations(mockIntegrations);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching integrations:', error);
      toast.error('Failed to load integrations');
      setIsLoading(false);
    }
  };

  const toggleIntegrationStatus = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => {
        if (integration.id === id) {
          const newStatus = integration.status === 'active' ? 'inactive' : 'active';
          return {
            ...integration,
            status: newStatus
          };
        }
        return integration;
      })
    );
    
    toast.success('Integration status updated');
  };

  const syncIntegration = (id: string) => {
    // In a real app, this would trigger a sync with the integration
    setIntegrations(prev => 
      prev.map(integration => {
        if (integration.id === id) {
          return {
            ...integration,
            lastSync: new Date(),
            status: integration.status === 'error' ? 'active' : integration.status
          };
        }
        return integration;
      })
    );
    
    toast.success('Integration synced successfully');
  };

  const handleConfigChange = (key: string, value: string) => {
    if (!selectedIntegration) return;
    
    setSelectedIntegration({
      ...selectedIntegration,
      configOptions: {
        ...selectedIntegration.configOptions,
        [key]: value
      }
    });
  };

  const addConfigOption = () => {
    if (!selectedIntegration || !newConfigKey.trim() || !newConfigValue.trim()) return;
    
    setSelectedIntegration({
      ...selectedIntegration,
      configOptions: {
        ...selectedIntegration.configOptions,
        [newConfigKey.trim()]: newConfigValue.trim()
      }
    });
    
    setNewConfigKey('');
    setNewConfigValue('');
  };

  const removeConfigOption = (key: string) => {
    if (!selectedIntegration || !selectedIntegration.configOptions) return;
    
    const newConfigOptions = { ...selectedIntegration.configOptions };
    delete newConfigOptions[key];
    
    setSelectedIntegration({
      ...selectedIntegration,
      configOptions: newConfigOptions
    });
  };

  const saveIntegrationConfig = () => {
    if (!selectedIntegration) return;
    
    setIntegrations(prev => 
      prev.map(integration => {
        if (integration.id === selectedIntegration.id) {
          return selectedIntegration;
        }
        return integration;
      })
    );
    
    setConfigModalOpen(false);
    toast.success('Integration configuration saved');
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Never';
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getTypeIcon = (type: Integration['type']) => {
    switch (type) {
      case 'payment': return <CreditCard size={16} className="text-green-500" />;
      case 'analytics': return <Globe size={16} className="text-blue-500" />;
      case 'email': return <Mail size={16} className="text-amber-500" />;
      case 'messaging': return <MessageSquare size={16} className="text-purple-500" />;
      case 'security': return <Lock size={16} className="text-red-500" />;
      case 'other': return <Plugin size={16} className="text-gray-500" />;
    }
  };

  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            <Check size={12} className="mr-1" /> Active
          </span>
        );
      case 'inactive':
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            <XCircle size={12} className="mr-1" /> Inactive
          </span>
        );
      case 'error':
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            <AlertTriangle size={12} className="mr-1" /> Error
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
            <RefreshCw size={12} className="mr-1" /> Pending
          </span>
        );
    }
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
        <h1 className="text-2xl font-bold text-gray-800">Integrations</h1>
        <button
          onClick={fetchIntegrations}
          className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-gray-200"
        >
          <RefreshCw size={16} className="mr-2" /> Refresh
        </button>
      </div>
      
      {/* Info card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm">
        <p className="flex items-center">
          <FileText size={16} className="mr-2 flex-shrink-0" />
          <span>
            Configure third-party integrations to extend your platform functionality. 
            API keys and credentials are securely stored and encrypted.
          </span>
        </p>
      </div>
      
      {/* Integrations list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {integrations.map(integration => (
            <li key={integration.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    {getTypeIcon(integration.type)}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">{integration.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(integration.status)}
                  <button
                    onClick={() => syncIntegration(integration.id)}
                    className="p-1 text-gray-500 hover:text-primary-600 rounded"
                    title="Sync"
                  >
                    <RefreshCcw size={16} />
                  </button>
                  <button
                    onClick={() => toggleIntegrationStatus(integration.id)}
                    className={`p-1 ${integration.status === 'active' ? 'text-green-500 hover:text-red-500' : 'text-gray-500 hover:text-green-500'} rounded`}
                    title={integration.status === 'active' ? 'Deactivate' : 'Activate'}
                  >
                    {integration.status === 'active' ? (
                      <XCircle size={16} />
                    ) : (
                      <Check size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedIntegration(integration);
                      setConfigModalOpen(true);
                      setShowApiKey(false);
                    }}
                    className="p-1 text-gray-500 hover:text-primary-600 rounded"
                    title="Configure"
                  >
                    <Link size={16} />
                  </button>
                </div>
              </div>
              
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <Database size={14} className="mr-1" />
                  <span>Type: </span>
                  <span className="ml-1 capitalize">{integration.type}</span>
                </div>
                <div className="flex items-center">
                  <RefreshCw size={14} className="mr-1" />
                  <span>Last Sync: </span>
                  <span className="ml-1">{formatDate(integration.lastSync)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Configuration Modal */}
      {configModalOpen && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800 flex items-center">
                  {getTypeIcon(selectedIntegration.type)}
                  <span className="ml-2">{selectedIntegration.name} Configuration</span>
                </h3>
                <button
                  onClick={() => setConfigModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div>
                  {getStatusBadge(selectedIntegration.status)}
                </div>
              </div>
              
              {/* API Key */}
              {selectedIntegration.apiKey && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <div className="flex">
                    <div className="flex-1 relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        readOnly
                        value={selectedIntegration.apiKey}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 pr-10"
                      />
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <button
                      onClick={() => copyToClipboard(selectedIntegration.apiKey!, 'API key copied to clipboard')}
                      className="ml-2 p-2 bg-gray-100 text-gray-500 hover:text-primary-600 rounded-md"
                      title="Copy to clipboard"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Keep this key secure. It provides full access to this integration.
                  </p>
                </div>
              )}
              
              {/* Webhook URL */}
              {selectedIntegration.webhook && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Webhook URL
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      value={selectedIntegration.webhook}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={() => copyToClipboard(selectedIntegration.webhook!, 'Webhook URL copied to clipboard')}
                      className="ml-2 p-2 bg-gray-100 text-gray-500 hover:text-primary-600 rounded-md"
                      title="Copy to clipboard"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Configure this URL in the third-party service to receive events.
                  </p>
                </div>
              )}
              
              {/* Config Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Configuration Options
                </label>
                <div className="border border-gray-300 rounded-md divide-y divide-gray-200">
                  {selectedIntegration.configOptions && 
                   Object.keys(selectedIntegration.configOptions).length > 0 ? (
                    Object.entries(selectedIntegration.configOptions).map(([key, value]) => (
                      <div key={key} className="p-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">{key}</p>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => handleConfigChange(key, e.target.value)}
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <button
                          onClick={() => removeConfigOption(key)}
                          className="p-1 text-gray-500 hover:text-red-500 rounded"
                          title="Remove option"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-gray-500">
                      No configuration options set.
                    </div>
                  )}
                </div>
              </div>
              
              {/* Add New Config Option */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add New Configuration Option
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Key"
                    value={newConfigKey}
                    onChange={(e) => setNewConfigKey(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={newConfigValue}
                    onChange={(e) => setNewConfigValue(e.target.value)}
                    className="flex-1 px-3 py-2 border-y border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={addConfigOption}
                    disabled={!newConfigKey.trim() || !newConfigValue.trim()}
                    className="ml-2 px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setConfigModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={saveIntegrationConfig}
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Integrations; 