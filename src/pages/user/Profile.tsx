import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { User, Mail, Phone, Lock, Edit2, Save, X } from 'lucide-react';

// Mock user type
interface UserDetails {
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  balance: number;
  avatar?: string;
}

const UserProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // In a real app, fetch user data from backend
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock user data
        setUserDetails({
          name: currentUser?.name || 'John Doe',
          email: currentUser?.email || 'user@example.com',
          phone: '+1 (555) 123-4567',
          joinedDate: 'January 15, 2023',
          balance: 1250.75,
        });
      } catch (error) {
        toast.error('Failed to load profile data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  useEffect(() => {
    if (userDetails) {
      setFormData(prev => ({
        ...prev,
        name: userDetails.name,
        phone: userDetails.phone,
      }));
    }
  }, [userDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    setIsUpdating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state with new data
      setUserDetails(prev => {
        if (!prev) return null;
        return {
          ...prev,
          name: formData.name,
          phone: formData.phone,
        };
      });
      
      setIsEditing(false);
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse flex flex-col md:flex-row gap-8">
          <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto md:mx-0"></div>
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <p className="text-center text-gray-600">Failed to load profile data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-8 text-white">
        <div className="flex flex-col md:flex-row items-center">
          <div className="bg-white rounded-full p-1 shadow-lg mb-4 md:mb-0 md:mr-6">
            {userDetails.avatar ? (
              <img 
                src={userDetails.avatar} 
                alt={userDetails.name} 
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center">
                <User size={40} className="text-primary-500" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{userDetails.name}</h1>
            <p className="text-primary-100">Member since {userDetails.joinedDate}</p>
            <div className="mt-2 bg-white/20 px-3 py-1 rounded-full inline-block text-sm">
              <span className="font-semibold">Balance:</span> ${userDetails.balance.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        {!isEditing ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center text-primary-600 hover:text-primary-700"
              >
                <Edit2 size={16} className="mr-1" />
                Edit Profile
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary-50 p-2 rounded-full mr-4">
                  <User size={20} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{userDetails.name}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-50 p-2 rounded-full mr-4">
                  <Mail size={20} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">{userDetails.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-50 p-2 rounded-full mr-4">
                  <Phone size={20} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{userDetails.phone}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <X size={16} className="mr-1" />
                Cancel
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={userDetails.email}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 cursor-not-allowed"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Contact support to change your email address
                </p>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your phone number"
                />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter current password"
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter new password"
                  minLength={8}
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Confirm new password"
                  minLength={8}
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isUpdating}
                className={`flex items-center justify-center py-2 px-6 rounded-md text-white font-medium ${
                  isUpdating
                    ? 'bg-primary-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700'
                } transition-colors shadow-md`}
              >
                {isUpdating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <>
                    <Save size={18} className="mr-2" /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile; 