import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateUser, deleteUser } from '../slice/userSlice';

const Management = () => {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    id: '',
    email: '',
    role: '',
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updateUser(formData));
    } else {
      dispatch(addUser(formData));
    }
    setFormData({ id: '', email: '', role: '' });
    setEditing(false);
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block font-medium mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          {editing ? 'Update User' : 'Add User'}
        </button>
      </form>

      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <div>
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-gray-500">Role: {user.role}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
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
