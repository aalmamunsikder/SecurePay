import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-accent-50 via-secondary-50 to-primary-50">
      {/* Header */}
      <header className="p-4 bg-white shadow-sm">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center text-xl font-bold text-primary-800">
            <Shield className="mr-2" size={24} />
            <span>SecurePay</span>
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in">
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} SecurePay. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;