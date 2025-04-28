import React, { useState, useEffect } from "react";

const TaskAssign = ({ onUserSelect, selectedUser }) => {
  const [users, setUsers] = useState([]); // Initialize users state

  useEffect(() => {
    const fetchUsers = async () => {
      // Mock API call for users
      const mockUsers = [
        { id: 1, name: "Alice", role: "Admin" },
        { id: 2, name: "Bob", role: "Manager" },
        { id: 3, name: "Charlie", role: "Developer" },
      ];

      console.log("Fetched users:", mockUsers);
      setUsers(mockUsers); // Setting users state with mock data
    };

    fetchUsers(); // Fetch users once after the initial render
  }, []);

  const handleSelectChange = (event) => {
    const selectedUserId = event.target.value;
    const user = users.find((u) => u.id === parseInt(selectedUserId));
    onUserSelect(user); // Notify parent of selected user
  };

  return (
    <div>
      <label htmlFor="user-select" className="block text-lg mb-2">
        Select a user:
      </label>
      <select
        id="user-select"
        onChange={handleSelectChange}
        value={selectedUser?.id || ""}
        className="p-2 border border-gray-300 rounded-lg"
      >
        <option value="" disabled>
          Choose a user...
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} - {user.role}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskAssign;
