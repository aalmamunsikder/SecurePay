import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Home, Settings, LogOut, Menu, X, User, CreditCard, 
  Users, BarChart3, DollarSign, Shield, Layers, ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close sidebar on location change (for mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determine navigation based on user role
  const renderNavigation = () => {
    if (!currentUser) {
      return (
        <div className="space-y-2">
          <Link to="/" className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/10 transition-colors">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/auth/login" className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/10 transition-colors">
            <User size={20} />
            <span>Login</span>
          </Link>
        </div>
      );
    }

    switch (currentUser.role) {
      case 'owner':
        return (
          <div className="space-y-2">
            <Link to="/owner/dashboard" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/owner/dashboard' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/owner/platform-owners" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/owner/platform-owners' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <Users size={20} />
              <span>Platform Owners</span>
            </Link>
            <Link to="/owner/settings" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/owner/settings' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <Settings size={20} />
              <span>System Settings</span>
            </Link>
          </div>
        );
      
      case 'platform_owner':
        return (
          <div className="space-y-2">
            <Link to="/platform/dashboard" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/platform/dashboard' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/platform/staff" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/platform/staff' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <Shield size={20} />
              <span>Manage Staff</span>
            </Link>
            <Link to="/platform/users" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/platform/users' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <Users size={20} />
              <span>Manage Users</span>
            </Link>
            <Link to="/platform/transactions" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/platform/transactions' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <CreditCard size={20} />
              <span>Transactions</span>
            </Link>
            <Link to="/platform/withdrawals" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/platform/withdrawals' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <DollarSign size={20} />
              <span>Withdrawal Requests</span>
            </Link>
            <Link to="/platform/financials" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/platform/financials' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <Layers size={20} />
              <span>Financial Reports</span>
            </Link>
          </div>
        );
        
      case 'staff':
        return (
          <div className="space-y-2">
            <Link to="/staff/dashboard" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/staff/dashboard' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/staff/users" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/staff/users' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <Users size={20} />
              <span>Manage Users</span>
            </Link>
            <Link to="/staff/transactions" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/staff/transactions' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <CreditCard size={20} />
              <span>Transactions</span>
            </Link>
            <Link to="/staff/withdrawals" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/staff/withdrawals' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <DollarSign size={20} />
              <span>Withdrawal Requests</span>
            </Link>
          </div>
        );
        
      case 'user':
        return (
          <div className="space-y-2">
            <Link to="/user/profile" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/user/profile' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <User size={20} />
              <span>My Profile</span>
            </Link>
            <Link to="/user/transactions" className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname === '/user/transactions' ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
              <CreditCard size={20} />
              <span>Transaction History</span>
            </Link>
            {currentUser.platformSlug && (
              <>
                <Link to={`/${currentUser.platformSlug}/deposit`} className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname.includes('/deposit') ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
                  <DollarSign size={20} />
                  <span>Deposit Funds</span>
                </Link>
                <Link to={`/${currentUser.platformSlug}/withdraw`} className={`flex items-center space-x-2 p-2 rounded-md ${location.pathname.includes('/withdraw') ? 'bg-primary-500 text-white' : 'hover:bg-white/10'} transition-colors`}>
                  <DollarSign size={20} />
                  <span>Withdraw Funds</span>
                </Link>
              </>
            )}
          </div>
        );
        
      default:
        return (
          <div className="space-y-2">
            <Link to="/" className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/10 transition-colors">
              <Home size={20} />
              <span>Home</span>
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-accent-50 via-secondary-50 to-primary-50">
      {/* Sidebar - Desktop - Only shown for logged in users */}
      {currentUser && (
        <div className={`hidden md:block w-64 bg-gradient-to-b from-primary-900 to-secondary-900 text-white p-4 transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="text-xl font-bold flex items-center">
              <Shield className="mr-2" />
              <span>SecurePay</span>
            </Link>
          </div>
          
          <nav className="mt-8">
            {renderNavigation()}
          </nav>
          
          <div className="absolute bottom-4 left-4 right-4">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 p-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Mobile sidebar - shown when sidebarOpen is true and user is logged in */}
      {sidebarOpen && currentUser && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
          <div className="w-64 h-full bg-gradient-to-b from-primary-900 to-secondary-900 text-white p-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="text-xl font-bold flex items-center">
                <Shield className="mr-2" />
                <span>SecurePay</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            
            <nav className="mt-8">
              {renderNavigation()}
            </nav>
            
            <div className="absolute bottom-4 left-4 right-4">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 p-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        {currentUser ? (
          <header className="bg-white shadow-sm z-10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden mr-4">
                  <Menu size={24} />
                </button>
                <h1 className="text-xl font-semibold text-gray-800">
                  {/* Dynamic page title based on current route */}
                  {location.pathname === '/' ? '' : 
                   location.pathname.includes('dashboard') ? 'Dashboard' :
                   location.pathname.includes('profile') ? 'My Profile' :
                   location.pathname.includes('deposit') ? 'Deposit Funds' :
                   location.pathname.includes('withdraw') ? 'Withdraw Funds' :
                   location.pathname.includes('transactions') ? 'Transactions' :
                   location.pathname.includes('users') ? 'Manage Users' :
                   location.pathname.includes('staff') ? 'Manage Staff' :
                   location.pathname.includes('withdrawals') ? 'Withdrawal Requests' :
                   location.pathname.includes('financials') ? 'Financial Reports' :
                   location.pathname.includes('platform-owners') ? 'Platform Owners' :
                   location.pathname.includes('settings') ? 'System Settings' : ''}
                </h1>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white">
                    {currentUser && currentUser.name ? currentUser.name.charAt(0) : ''}
                  </div>
                  <span className="hidden md:block text-sm">{currentUser?.name}</span>
                  <ChevronDown size={16} />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-20">
                    <div className="px-4 py-2 text-sm text-gray-500">
                      Logged in as <span className="font-medium">{currentUser?.role?.replace('_', ' ')}</span>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    {currentUser?.role === 'user' && (
                      <Link 
                        to="/user/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>
        ) : (
          <header className="p-4 bg-white shadow-sm">
            <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="flex items-center text-xl font-bold text-primary-800">
                <Shield className="mr-2" size={24} />
                <span>SecurePay</span>
              </Link>
              <div className="flex space-x-2">
                <Link to="/auth/login" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                  Login
                </Link>
                <Link to="/auth/register" className="bg-white hover:bg-gray-100 text-primary-600 border border-primary-500 px-4 py-2 rounded-md text-sm transition-colors">
                  Register
                </Link>
              </div>
            </div>
          </header>
        )}
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;