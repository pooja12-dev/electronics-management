import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateUser, deleteUser } from '../slice/userSlice';

const roles = ['Supervisor', 'Admin', 'Manager', 'Vendor', 'Employee'];

const Management = () => {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useSelector((state) => state.users);

  const [formType, setFormType] = useState('add'); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    photo: '',
    role: roles[0],
  });
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    resetForm();
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: editUserId, ...formData }));
    resetForm();
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const resetForm = () => {
    setFormType('add');
    setEditUserId(null);
    setFormData({
      email: '',
      name: '',
      photo: '',
      role: roles[0],
    });
  };

  const handleEditClick = (user) => {
    setFormType('edit');
    setEditUserId(user.id);
    setFormData({
      email: user.email,
      name: user.name,
      photo: user.photo,
      role: user.role,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <form
        onSubmit={formType === 'add' ? handleAddUser : handleEditUser}
        className="bg-gray-100 p-4 rounded-md shadow-md mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          {formType === 'add' ? 'Add User' : 'Edit User'}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Photo URL:</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleFormChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleFormChange}
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {formType === 'add' ? 'Add User' : 'Update User'}
        </button>
      </form>

      <ul className="bg-white rounded-md shadow-md">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between px-4 py-2 border-b"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400">Role: {user.role}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEditClick(user)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Management;
