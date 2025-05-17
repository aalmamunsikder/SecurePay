import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Auth and Context Providers
import { AuthProvider } from './contexts/AuthContext';

// Layout Components
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Public Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// User Pages
import UserProfile from './pages/user/Profile';
import UserDeposit from './pages/user/Deposit';
import UserWithdraw from './pages/user/Withdraw';
import UserTransactions from './pages/user/Transactions';

// Staff Pages
import StaffDashboard from './pages/staff/Dashboard';
import ManageUsers from './pages/staff/ManageUsers';
import ManageTransactions from './pages/staff/ManageTransactions';
import WithdrawalRequests from './pages/staff/WithdrawalRequests';

// Platform Owner Pages
import PlatformOwnerDashboard from './pages/platform-owner/Dashboard';
import ManageStaff from './pages/platform-owner/ManageStaff';
import PlatformFinancials from './pages/platform-owner/Financials';

// Owner Pages
import OwnerDashboard from './pages/owner/Dashboard';
import PlatformOwners from './pages/owner/PlatformOwners';
import SystemSettings from './pages/owner/SystemSettings';

// Protected Route Component
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          {/* User Routes */}
          <Route path="/:platformSlug" element={<AppLayout />}>
            <Route path="deposit" element={<UserDeposit />} />
            <Route path="withdraw" element={<UserWithdraw />} />
          </Route>

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="/user" element={<AppLayout />}>
              <Route path="profile" element={<UserProfile />} />
              <Route path="transactions" element={<UserTransactions />} />
              <Route index element={<Navigate replace to="/user/profile" />} />
            </Route>
          </Route>

          {/* Protected Staff Routes */}
          <Route element={<ProtectedRoute allowedRoles={['staff']} />}>
            <Route path="/staff" element={<AppLayout />}>
              <Route path="dashboard" element={<StaffDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="transactions" element={<ManageTransactions />} />
              <Route path="withdrawals" element={<WithdrawalRequests />} />
              <Route index element={<Navigate replace to="/staff/dashboard" />} />
            </Route>
          </Route>

          {/* Protected Platform Owner Routes */}
          <Route element={<ProtectedRoute allowedRoles={['platform_owner']} />}>
            <Route path="/platform" element={<AppLayout />}>
              <Route path="dashboard" element={<PlatformOwnerDashboard />} />
              <Route path="staff" element={<ManageStaff />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="transactions" element={<ManageTransactions />} />
              <Route path="withdrawals" element={<WithdrawalRequests />} />
              <Route path="financials" element={<PlatformFinancials />} />
              <Route index element={<Navigate replace to="/platform/dashboard" />} />
            </Route>
          </Route>

          {/* Protected Owner Routes */}
          <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
            <Route path="/owner" element={<AppLayout />}>
              <Route path="dashboard" element={<OwnerDashboard />} />
              <Route path="platform-owners" element={<PlatformOwners />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route index element={<Navigate replace to="/owner/dashboard" />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </Router>
  );
}

export default App;