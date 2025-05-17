import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { MailCheck, AlertCircle } from 'lucide-react';

const VerifyEmail: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyUserEmail = async () => {
      // Get token from URL query params
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (!token) {
        setIsVerifying(false);
        toast.error('Invalid verification link');
        return;
      }

      try {
        await verifyEmail(token);
        setIsSuccess(true);
        setIsVerifying(false);
        toast.success('Email verified successfully');
      } catch (error) {
        setIsVerifying(false);
        toast.error('Failed to verify email');
        console.error(error);
      }
    };

    verifyUserEmail();
  }, [location.search, verifyEmail]);

  const handleContinue = () => {
    navigate('/auth/login');
  };

  return (
    <div className="p-8 text-center">
      {isVerifying ? (
        <>
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Verifying your email</h2>
          <p className="text-gray-600">
            Please wait while we verify your email address...
          </p>
        </>
      ) : isSuccess ? (
        <>
          <div className="flex justify-center mb-6">
            <MailCheck size={40} className="text-success-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Email Verified!</h2>
          <p className="text-gray-600 mb-6">
            Your email has been successfully verified. You can now log in to your account.
          </p>
          <button
            onClick={handleContinue}
            className="w-full py-2 px-4 rounded-md bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors shadow-md"
          >
            Continue to Login
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-center mb-6">
            <AlertCircle size={40} className="text-error-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Verification Failed</h2>
          <p className="text-gray-600 mb-6">
            We couldn't verify your email address. The verification link may be invalid or expired.
          </p>
          <button
            onClick={() => navigate('/auth/login')}
            className="w-full py-2 px-4 rounded-md bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors shadow-md"
          >
            Back to Login
          </button>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;