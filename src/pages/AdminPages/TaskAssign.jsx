import React, { useState, useEffect } from "react";

const TaskAssign = ({ onUserSelect, selectedUser ,users }) => {
 

  // const handleSelectChange = (event) => {
  //   const selectedUserId = event.target.value;
  //   const user = users.find((u) => u.id === parseInt(selectedUserId));
  //   onUserSelect(user); // Notify parent of selected user
  // };

  return (
    <div>
      <label htmlFor="user-select" className="block text-lg mb-2">
        Select a user:
      </label>
      <select
        id="user-select"
        onChange={(e) => {
          const selectedId = e.target.value;
          const user = users.find((u) => u.id === selectedId);
          onUserSelect(user);
        }}
        value={selectedUser?.id || ""}
        className="p-2 border border-gray-300 rounded-lg"
      >
        <option value="" disabled>
          Choose a user...
        </option>
        {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name} ({user.role})
        </option>
      ))}
      </select>
    </div>
  );
};

export default TaskAssign;
