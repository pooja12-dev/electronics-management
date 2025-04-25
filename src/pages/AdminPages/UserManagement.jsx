import { useState, useEffect } from "react";
import {
  UserPlus,
  Trash2,
  Edit,
  Save,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Lock,
  Unlock,
} from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Employee",
  });
  const [errors, setErrors] = useState({});
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserData, setEditingUserData] = useState({});
  const itemsPerPage = 5;

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: "John Smith",
          email: "john@example.com",
          role: "Admin",
          status: "Active",
          permission: "Granted",
        },
        {
          id: 2,
          name: "Emily Johnson",
          email: "emily@example.com",
          role: "Manager",
          status: "Active",
          permission: "Revoked",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const validateInputs = (field, value) => {
    let error = "";
    if (!value.trim()) {
      error = `${field} is required`;
    } else if (
      field === "Email" &&
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    ) {
      error = "Invalid email format";
    }
    return error;
  };

  const handleAddUser = () => {
    const nameError = validateInputs("Name", newUser.name);
    const emailError = validateInputs("Email", newUser.email);

    if (nameError || emailError) {
      setErrors({ name: nameError, email: emailError });
      return;
    }

    setUsers([
      ...users,
      {
        ...newUser,
        id: users.length + 1,
        status: "Active",
        permission: "Revoked",
      },
    ]);
    setIsModalOpen(false);
    setNewUser({ name: "", email: "", role: "Employee" });
    setErrors({});
  };

  const handleEditUser = (id) => {
    setEditingUserId(id);
    const user = users.find((u) => u.id === id);
    setEditingUserData({ ...user });
  };

  const saveEditedUser = () => {
    setUsers(
      users.map((u) =>
        u.id === editingUserId ? { ...u, ...editingUserData } : u
      )
    );
    setEditingUserId(null);
    setEditingUserData({});
  };

  const togglePermission = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? {
              ...u,
              permission: u.permission === "Granted" ? "Revoked" : "Granted",
            }
          : u
      )
    );
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewUser({ name: "", email: "", role: "Employee" });
    setErrors({});
  };

  const filteredUsers = users.filter(
    (user) =>
      (search === "" ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())) &&
      (selectedRole === "All" || user.role === selectedRole)
  );

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 0;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-gray-50 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700"
        >
          <UserPlus size={16} />
          <span>Add User</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-md ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter user name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter user email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                >
                  {["Admin", "Manager", "Supervisor", "Employee"].map(
                    (role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white shadow-md rounded-md">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Permission</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-4 py-2">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      value={editingUserData.name}
                      onChange={(e) =>
                        setEditingUserData({
                          ...editingUserData,
                          name: e.target.value,
                        })
                      }
                      className="px-2 py-1 border rounded-md"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingUserId === user.id ? (
                    <input
                      type="email"
                      value={editingUserData.email}
                      onChange={(e) =>
                        setEditingUserData({
                          ...editingUserData,
                          email: e.target.value,
                        })
                      }
                      className="px-2 py-1 border rounded-md"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingUserId === user.id ? (
                    <select
                      value={editingUserData.role}
                      onChange={(e) =>
                        setEditingUserData({
                          ...editingUserData,
                          role: e.target.value,
                        })
                      }
                      className="px-2 py-1 border rounded-md"
                    >
                      {["Admin", "Manager", "Supervisor", "Employee"].map(
                        (role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        )
                      )}
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => togglePermission(user.id)}
                    className={`px-2 py-1 rounded-md ${
                      user.permission === "Granted"
                        ? "bg-green-200"
                        : "bg-red-200"
                    }`}
                  >
                    {user.permission}
                  </button>
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  {editingUserId === user.id ? (
                    <button
                      onClick={saveEditedUser}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Save size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </button>
        <span>
          Page {totalItems > 0 ? currentPage : 0} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
