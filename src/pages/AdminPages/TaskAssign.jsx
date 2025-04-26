import React, { useState, useEffect } from "react";

const TaskAssign = () => {
  const [users, setUsers] = useState([]); // Initialize users state
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      // Here you would normally fetch from an API, for now we'll use mock data
      const mockUsers = [
        {
          id: 1,
          name: "Alice",
          role: "Admin",
        },
        {
          id: 2,
          name: "Bob",
          role: "Manager",
        },
        {
          id: 3,
          name: "Charlie",
          role: "Developer",
        },
      ];

      console.log("Fetched users:", mockUsers);
      setUsers(mockUsers); // Setting users state with mock data
    };

    fetchUsers(); // Call the fetch function
  }, []); // Empty dependency array means this runs once after the initial render

  const handleSelectChange = (event) => {
    const selectedUserId = event.target.value;
    const user = users.find((u) => u.id === parseInt(selectedUserId));
    setSelectedUser(user);
    console.log("Selected User:", user);
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Task Assignment</h1>

      {/* Dropdown to select a user */}
      <label htmlFor="user-select" className="block text-lg mb-2">
        Select a user:
      </label>
      <select
        id="user-select"
        onChange={handleSelectChange}
        className="p-2 border border-gray-300 rounded-lg"
      >
        <option value="" disabled selected>
          Choose a user...
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} - {user.role}
          </option>
        ))}
      </select>

      {/* Display the selected user's info */}
      {selectedUser && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Selected User</h3>
          <p>Name: {selectedUser.name}</p>
          <p>Role: {selectedUser.role}</p>
        </div>
      )}
    </div>
  );
};

export default TaskAssign;
