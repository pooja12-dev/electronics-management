import React, { useState, useEffect } from "react";
import UserTable from "../../components/UserTable";
import { FaEdit, FaTrashAlt, FaUserPlus } from "react-icons/fa"; // Added FaUserPlus icon
import { getUserRoleFromFirestore } from "../../userService";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

const UserManagement = () => {
  console.log("user management component rendered");
  const [users, setUsers] = useState([]); // Initialize users state
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserData, setEditingUserData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    email: "",
    role: "User",
    createdAt: "",
    name: "",
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    console.log("useEffect triggered");

    const fetchUsers = async () => {
      console.log("Fetching users...");
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersFromFirebase = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched users: ", usersFromFirebase);
        setUsers(usersFromFirebase);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching users:", err.message);
      }
    };

    fetchUsers();
  }, []);

  // Log whenever users state changes
  // useEffect(() => {
  //   console.log("Users state changed:", users);
  // }, [users]);
  // const togglePermission = (userId) => {
  //   setUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.id === userId
  //         ? {
  //             ...user,
  //             permission: user.permission === "Granted" ? "Revoked" : "Granted",
  //           }
  //         : user
  //     )
  //   );
  // };

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

  const handleAddUserClick = () => {
    setShowAddUserModal(true);
  };

  const handleCloseModal = () => {
    setShowAddUserModal(false);
    setNewUserData({
      name: "",
      email: "",
      role: "Administrator",
      permission: "Granted",
    });
  };

  const handleAddUserChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    // Validate input
    if (!newUserData.name || !newUserData.email) {
      alert("Name and email are required");
      return;
    }

    // Create new user with unique ID
    const newId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    const newUser = {
      id: newId,
      ...newUserData,
    };

    setUsers((prev) => [...prev, newUser]);
    setTotalItems((prev) => prev + 1);
    setTotalPages(Math.ceil((totalItems + 1) / 5));

    // Close modal and reset form
    handleCloseModal();
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * 5;
    setPaginatedUsers(users.slice(startIndex, startIndex + 5)); // Update paginated users
  }, [currentPage, users]);

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 sm:mb-0">
          User Management
        </h1>
        <button
          onClick={handleAddUserClick}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <FaUserPlus className="mr-2" /> Add User
        </button>
      </div>

      <UserTable
        users={users}
        paginatedUsers={paginatedUsers}
        editingUserId={editingUserId}
        editingUserData={editingUserData}
        // togglePermission={togglePermission}
        handleEditUser={handleEditUser}
        saveEditedUser={saveEditedUser}
        deleteUser={deleteUser}
        setEditingUserData={setEditingUserData}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        setCurrentPage={setCurrentPage}
      />

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 bg-blue-600 text-white flex justify-between items-center">
              <h3 className="text-lg font-medium">Add New User</h3>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-gray-200"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newUserData.name}
                  onChange={handleAddUserChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={newUserData.email}
                  onChange={handleAddUserChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role
                </label>
                <select
                  name="role"
                  value={newUserData.role}
                  onChange={handleAddUserChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Permission
                </label>
                <select
                  name="permission"
                  value={newUserData.permission}
                  onChange={handleAddUserChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Granted">Granted</option>
                  <option value="Revoked">Revoked</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
