import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateUser, deleteUser } from '../slice/userSlice';

const roles = ['Supervisor', 'Admin', 'Manager', 'Vendor', 'Employee']; // Fixed roles

const Management = () => {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useSelector((state) => state.users);

  const [newUser, setNewUser] = useState({ email: '', role: roles[0] });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.email) {
      dispatch(addUser(newUser));
      setNewUser({ email: '', role: roles[0] });
    }
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (editUser) {
      dispatch(updateUser(editUser));
      setEditUser(null); // Close modal
    }
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Add User Form */}
      <form
        onSubmit={handleAddUser}
        className="mb-6 bg-gray-100 p-4 rounded-md shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Add User</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Role:</label>
          <select
            value={newUser.role}
            onChange={(e) =>
              setNewUser({ ...newUser, role: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add User
        </button>
      </form>

      {/* User List */}
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center py-3">
            <div>
              <p>
                <span className="font-semibold">{user.email}</span> - {user.role}
              </p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => setEditUser(user)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit User Modal */}
      {editUser && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setEditUser(null)} // Close modal on overlay click
        >
          <div
            className="bg-white p-6 rounded-md shadow-md max-w-sm w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <form onSubmit={handleUpdateUser}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Email:</label>
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Role:</label>
                <select
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser({ ...editUser, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={() => setEditUser(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;
