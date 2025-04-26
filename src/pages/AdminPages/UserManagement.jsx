import React, { useState, useEffect } from "react";
import UserTable from "../../components/UserTable";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import FontAwesome icons

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Initialize users state
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserData, setEditingUserData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      // Mock data for users (replace with actual API call)
      const mockUsers = [
        {
          id: 1,
          name: "Alice",
          email: "alice@example.com",
          role: "Admin",
          permission: "Granted",
        },
        {
          id: 2,
          name: "Bob",
          email: "bob@example.com",
          role: "Manager",
          permission: "Revoked",
        },
      ];
      setUsers(mockUsers);
      setPaginatedUsers(mockUsers.slice(0, 5)); // Paginate users
      setTotalItems(mockUsers.length);
      setTotalPages(Math.ceil(mockUsers.length / 5));
    };
    fetchUsers();
  }, []);

  const togglePermission = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              permission: user.permission === "Granted" ? "Revoked" : "Granted",
            }
          : user
      )
    );
  };

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
    const user = users.find((u) => u.id === userId);
    if (user) setEditingUserData(user);
  };

  const saveEditedUser = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editingUserId ? { ...user, ...editingUserData } : user
      )
    );
    setEditingUserId(null);
    setEditingUserData({});
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setTotalItems((prevTotal) => prevTotal - 1);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * 5;
    setPaginatedUsers(users.slice(startIndex, startIndex + 5)); // Update paginated users
  }, [currentPage, users]);

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">User Management</h1>
      <UserTable
        users={users} // Pass users down to UserTable
        paginatedUsers={paginatedUsers}
        editingUserId={editingUserId}
        editingUserData={editingUserData}
        togglePermission={togglePermission}
        handleEditUser={handleEditUser}
        saveEditedUser={saveEditedUser}
        deleteUser={deleteUser}
        setEditingUserData={setEditingUserData}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UserManagement;
