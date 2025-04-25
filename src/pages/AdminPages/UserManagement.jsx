import { useState, useEffect } from "react";
import {
  Bell,
  Search,
  Filter,
  User,
  UserPlus,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

const UserManagement = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  useEffect(() => {
    // Simulating data fetch
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: "John Smith",
          email: "john@example.com",
          role: "Admin",
          status: "Active",
          lastLogin: "2 hours ago",
        },
        {
          id: 2,
          name: "Emily Johnson",
          email: "emily@example.com",
          role: "Manager",
          status: "Active",
          lastLogin: "1 day ago",
        },
        {
          id: 3,
          name: "Michael Brown",
          email: "michael@example.com",
          role: "Supervisor",
          status: "Inactive",
          lastLogin: "5 days ago",
        },
        {
          id: 4,
          name: "Sarah Wilson",
          email: "sarah@example.com",
          role: "Delivery Officer",
          status: "Active",
          lastLogin: "3 hours ago",
        },
        {
          id: 5,
          name: "David Lee",
          email: "david@example.com",
          role: "Vendor",
          status: "Active",
          lastLogin: "Just now",
        },
        {
          id: 6,
          name: "Jessica Taylor",
          email: "jessica@example.com",
          role: "Employee",
          status: "Inactive",
          lastLogin: "1 week ago",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter((user) => {
    return (
      (search === "" ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())) &&
      (selectedRole === "All" || user.role === selectedRole)
    );
  });

  const roles = [
    "All",
    "Admin",
    "Manager",
    "Supervisor",
    "Delivery Officer",
    "Vendor",
    "Employee",
  ];

  return (
    <div
      className={`w-full ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Content Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700">
            <UserPlus size={16} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div
        className={`flex flex-col md:flex-row gap-4 items-center mb-6 p-4 rounded-lg ${
          isDarkMode ? "bg-gray-700" : "bg-white"
        } shadow`}
      >
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className={`pl-10 pr-4 py-2 w-full rounded-md border ${
              isDarkMode
                ? "bg-gray-600 border-gray-500"
                : "bg-white border-gray-300"
            }`}
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className={`rounded-md border px-3 py-2 ${
              isDarkMode
                ? "bg-gray-600 border-gray-500"
                : "bg-white border-gray-300"
            }`}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-md border">
          <Filter size={16} />
          <span>More Filters</span>
        </button>
      </div>

      {/* Users Table */}
      <div
        className={`rounded-lg shadow overflow-hidden ${
          isDarkMode ? "bg-gray-700" : "bg-white"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Last Login
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isDarkMode ? "divide-gray-600" : "divide-gray-200"
              }`}
            >
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`hover:${
                      isDarkMode ? "bg-gray-600" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.role === "Admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "Manager"
                            ? "bg-blue-100 text-blue-800"
                            : user.role === "Supervisor"
                            ? "bg-green-100 text-green-800"
                            : user.role === "Delivery Officer"
                            ? "bg-yellow-100 text-yellow-800"
                            : user.role === "Vendor"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center gap-2">
                        <button className="p-1 rounded-full hover:bg-gray-200">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-200">
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-200">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-3 flex items-center justify-between border-t">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="px-4 py-2 border rounded-md">Previous</button>
            <button className="ml-3 px-4 py-2 border rounded-md">Next</button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredUsers.length}</span> of{" "}
                <span className="font-medium">{filteredUsers.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button className="px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  1
                </button>
                <button className="px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
