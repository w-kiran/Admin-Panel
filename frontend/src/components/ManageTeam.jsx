// src/components/ManageTeams.jsx
import React from 'react';
import { useAllUsers } from '../hooks/useGetAllUsers'; // Ensure path is correct
import axios from 'axios';
import { toast } from 'sonner';
import { BACKEND_URL } from '../../configURL';

const ManageTeam = () => {
  const { users, loading, error, refetch } = useAllUsers();

  const handleRoleChange = async (userId,newRole) => {
    try {
      const res = await axios.patch(`${BACKEND_URL}/api/auth/roleUpdate`, { targetUserId:userId,role: newRole }, {
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                refetch();
            }
      
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error('Failed to update user role', error);
    }
  };

  if (loading) return <div className="text-center p-8 text-gray-700">Loading users...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Manage Teams</h1>
        <p className="text-gray-500 mt-1">View and manage user roles within your organization.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">All Users</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Id</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${user.role === 'SUPERADMIN' ? 'bg-blue-100 text-blue-800' : ''}
                        ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : ''}
                        ${user.role === 'USER' ? 'bg-green-100 text-green-800' : ''}
                      `}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="SUPERADMIN">SUPERADMIN</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="USER">USER</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTeam;
