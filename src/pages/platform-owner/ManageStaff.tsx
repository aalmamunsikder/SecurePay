import React, { useState, useEffect } from 'react';
import { 
  Search, 
  UserPlus, 
  Mail, 
  Shield, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Users 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

// Define staff member interface
interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'support' | 'finance';
  lastLogin: string;
  isActive: boolean;
  joinedDate: string;
}

const ManageStaff: React.FC = () => {
  const { currentUser } = useAuth();
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'support' | 'finance'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [newStaffData, setNewStaffData] = useState({
    name: '',
    email: '',
    role: 'support' as const
  });

  const staffPerPage = 10;

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const fetchStaffMembers = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockStaff: StaffMember[] = [
        {
          id: 'staff-1',
          name: 'John Smith',
          email: 'john.smith@example.com',
          role: 'admin',
          lastLogin: new Date(Date.now() - 3600000).toISOString(),
          isActive: true,
          joinedDate: new Date(Date.now() - 3000000000).toISOString()
        },
        {
          id: 'staff-2',
          name: 'Emma Johnson',
          email: 'emma.johnson@example.com',
          role: 'finance',
          lastLogin: new Date(Date.now() - 86400000).toISOString(),
          isActive: true,
          joinedDate: new Date(Date.now() - 4000000000).toISOString()
        },
        {
          id: 'staff-3',
          name: 'Michael Brown',
          email: 'michael.brown@example.com',
          role: 'support',
          lastLogin: new Date(Date.now() - 43200000).toISOString(),
          isActive: true,
          joinedDate: new Date(Date.now() - 5000000000).toISOString()
        },
        {
          id: 'staff-4',
          name: 'Sarah Davis',
          email: 'sarah.davis@example.com',
          role: 'support',
          lastLogin: new Date(Date.now() - 172800000).toISOString(),
          isActive: false,
          joinedDate: new Date(Date.now() - 6000000000).toISOString()
        },
        {
          id: 'staff-5',
          name: 'David Wilson',
          email: 'david.wilson@example.com',
          role: 'finance',
          lastLogin: new Date(Date.now() - 259200000).toISOString(),
          isActive: true,
          joinedDate: new Date(Date.now() - 7000000000).toISOString()
        }
      ];
      
      setStaffMembers(mockStaff);
    } catch (error) {
      console.error('Failed to fetch staff members', error);
      toast.error('Failed to load staff members');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter staff members based on search and filters
  const filteredStaff = staffMembers.filter(staff => {
    // Filter by role
    if (roleFilter !== 'all' && staff.role !== roleFilter) return false;
    
    // Filter by status
    if (statusFilter === 'active' && !staff.isActive) return false;
    if (statusFilter === 'inactive' && staff.isActive) return false;
    
    // Filter by search query
    if (searchQuery && 
        !staff.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !staff.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !staff.role.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStaff.length / staffPerPage);
  const currentStaff = filteredStaff.slice(
    (currentPage - 1) * staffPerPage,
    currentPage * staffPerPage
  );

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  // Handle adding new staff member
  const handleAddStaff = () => {
    // Validate
    if (!newStaffData.name.trim() || !newStaffData.email.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newStaffData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Simulate API call
    const newStaff: StaffMember = {
      id: `staff-${staffMembers.length + 1}`,
      name: newStaffData.name,
      email: newStaffData.email,
      role: newStaffData.role,
      lastLogin: 'Never',
      isActive: true,
      joinedDate: new Date().toISOString()
    };
    
    setStaffMembers([...staffMembers, newStaff]);
    setShowAddModal(false);
    
    // Clear form
    setNewStaffData({
      name: '',
      email: '',
      role: 'support'
    });
    
    toast.success('Staff member added successfully');
  };

  // Handle updating staff member
  const handleUpdateStaff = () => {
    if (!selectedStaff) return;
    
    // Update staff in the list
    setStaffMembers(staffMembers.map(staff => 
      staff.id === selectedStaff.id ? selectedStaff : staff
    ));
    
    setShowEditModal(false);
    setSelectedStaff(null);
    toast.success('Staff member updated successfully');
  };

  // Handle toggling staff active status
  const toggleStaffStatus = (staffId: string) => {
    setStaffMembers(staffMembers.map(staff => 
      staff.id === staffId ? { ...staff, isActive: !staff.isActive } : staff
    ));
    
    const staff = staffMembers.find(s => s.id === staffId);
    if (staff) {
      toast.success(`Staff member ${staff.isActive ? 'deactivated' : 'activated'} successfully`);
    }
  };

  // Handle deleting staff member
  const handleDeleteStaff = (staffId: string) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaffMembers(staffMembers.filter(staff => staff.id !== staffId));
      toast.success('Staff member deleted successfully');
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (dateString === 'Never') return 'Never';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Format time ago
  const timeAgo = (dateString: string) => {
    if (dateString === 'Never') return 'Never';
    
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
    if (interval === 1) return `${interval} year ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    if (interval === 1) return `${interval} month ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    if (interval === 1) return `${interval} day ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    if (interval === 1) return `${interval} hour ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    if (interval === 1) return `${interval} minute ago`;
    
    return `${Math.floor(seconds)} seconds ago`;
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
        <h1 className="text-2xl font-bold text-gray-800">Manage Staff</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium"
        >
          <UserPlus size={16} className="mr-2" />
          Add Staff Member
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search size={16} className="text-gray-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by name, email, or role..."
                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="finance">Finance</option>
              <option value="support">Support</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <button
              onClick={resetFilters}
              className="py-2 px-3 border border-gray-300 rounded-md text-gray-600 hover:text-gray-800 flex items-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {/* Staff Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {currentStaff.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Users size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No staff members found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-3">
                          {staff.name.split(' ').map(part => part[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                          <div className="text-sm text-gray-500">{staff.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${staff.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                          staff.role === 'finance' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'}`}
                      >
                        {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${staff.isActive ? 'bg-success-100 text-success-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        {staff.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {timeAgo(staff.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(staff.joinedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedStaff(staff);
                            setShowEditModal(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit staff member"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => toggleStaffStatus(staff.id)}
                          className={`${staff.isActive ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'}`}
                          title={staff.isActive ? 'Deactivate staff member' : 'Activate staff member'}
                        >
                          {staff.isActive ? <X size={16} /> : <Check size={16} />}
                        </button>
                        <button
                          onClick={() => handleDeleteStaff(staff.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete staff member"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 flex justify-between items-center border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * staffPerPage + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * staffPerPage, filteredStaff.length)}
                </span>{' '}
                of <span className="font-medium">{filteredStaff.length}</span> staff
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add Staff Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={newStaffData.name}
                  onChange={(e) => setNewStaffData({...newStaffData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="John Smith"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={newStaffData.email}
                  onChange={(e) => setNewStaffData({...newStaffData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="john.smith@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <select
                  id="role"
                  value={newStaffData.role}
                  onChange={(e) => setNewStaffData({...newStaffData, role: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="finance">Finance</option>
                  <option value="support">Support</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStaff}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                Add Staff Member
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Staff Modal */}
      {showEditModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Edit Staff Member</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-500">
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="edit-name"
                  value={selectedStaff.name}
                  onChange={(e) => setSelectedStaff({...selectedStaff, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="edit-email"
                  value={selectedStaff.email}
                  onChange={(e) => setSelectedStaff({...selectedStaff, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="edit-role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="edit-role"
                  value={selectedStaff.role}
                  onChange={(e) => setSelectedStaff({...selectedStaff, role: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="admin">Admin</option>
                  <option value="finance">Finance</option>
                  <option value="support">Support</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="edit-status"
                  value={selectedStaff.isActive ? 'active' : 'inactive'}
                  onChange={(e) => setSelectedStaff({...selectedStaff, isActive: e.target.value === 'active'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStaff}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
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

export default ManageStaff; 