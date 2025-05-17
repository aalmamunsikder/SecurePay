import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'owner' | 'platform_owner' | 'staff' | 'user';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  verified: boolean;
  platformId?: string;
  platformSlug?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock authentication functions - would connect to a real backend in production
  const login = async (email: string, password: string): Promise<User> => {
    // Simulate API call
    setLoading(true);
    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll create mock users based on email patterns
      let user: User;
      
      if (email.includes('owner@')) {
        user = { id: '1', email, name: 'System Owner', role: 'owner', verified: true };
      } else if (email.includes('platform@')) {
        user = { 
          id: '2', 
          email, 
          name: 'Platform Owner', 
          role: 'platform_owner', 
          verified: true,
          platformId: 'p1',
          platformSlug: 'lisasweeps'
        };
      } else if (email.includes('staff@')) {
        user = { 
          id: '3', 
          email, 
          name: 'Staff Member', 
          role: 'staff', 
          verified: true,
          platformId: 'p1',
          platformSlug: 'lisasweeps'
        };
      } else {
        user = { 
          id: '4', 
          email, 
          name: 'Regular User', 
          role: 'user', 
          verified: true 
        };
      }
      
      // Save user to local storage
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw new Error('Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    // Simulate API call
    setLoading(true);
    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we just simulate successful registration
      // In a real app, we would store the user in a database
      
      // Registration successful
      return;
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const verifyEmail = async (token: string): Promise<void> => {
    // Simulate API call
    setLoading(true);
    try {
      // In a real app, this would make an API call to verify the token
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we just simulate successful verification
      if (currentUser) {
        const updatedUser = { ...currentUser, verified: true };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
      }
      
      return;
    } catch (error) {
      throw new Error('Email verification failed');
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (email: string): Promise<void> => {
    // Simulate API call
    setLoading(true);
    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we just simulate successful password reset request
      return;
    } catch (error) {
      throw new Error('Failed to request password reset');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string): Promise<void> => {
    // Simulate API call
    setLoading(true);
    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we just simulate successful password reset
      return;
    } catch (error) {
      throw new Error('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<User> => {
    // Simulate API call
    setLoading(true);
    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!currentUser) {
        throw new Error('User not logged in');
      }
      
      const updatedUser = { ...currentUser, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    verifyEmail,
    requestPasswordReset,
    resetPassword,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};