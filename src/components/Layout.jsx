// Layout.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Notifications from "./Notifications";

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Effect to load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.documentElement.classList.toggle("dark", savedMode);

    // Mock user data - in real app this would come from authentication
    const role = location.pathname.split("/")[2] || "admin";
    setUser({
      name: "John Doe",
      role: role,
      avatar: "/api/placeholder/40/40",
    });
  }, [location.pathname]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  const menuItems = {
    admin: [
      { name: "System Overview", icon: "📊", path: "/dashboard/admin" },
      { name: "User Management", icon: "👥", path: "/dashboard/admin/users" },
      {
        name: "Security Settings",
        icon: "🔒",
        path: "/dashboard/admin/security",
      },
      { name: "Configuration", icon: "⚙️", path: "/dashboard/admin/config" },
      { name: "Invoices", icon: "📄", path: "/dashboard/admin/invoices" },
      { name: "Logs", icon: "📋", path: "/dashboard/admin/logs" },
    ],
    manager: [
      { name: "Team Dashboard", icon: "📊", path: "/dashboard/manager" },
      { name: "Projects", icon: "📁", path: "/dashboard/manager/projects" },
      { name: "Team Data", icon: "👥", path: "/dashboard/manager/team" },
      { name: "Tasks", icon: "✓", path: "/dashboard/manager/tasks" },
      { name: "Inventory", icon: "📦", path: "/dashboard/manager/inventory" },
      { name: "Reports", icon: "📈", path: "/dashboard/manager/reports" },
    ],
    supervisor: [
      { name: "My Tasks", icon: "✓", path: "/dashboard/supervisor" },
      { name: "Calendar", icon: "📅", path: "/dashboard/supervisor/calendar" },
      {
        name: "Production Stats",
        icon: "📊",
        path: "/dashboard/supervisor/stats",
      },
      {
        name: "Reports Submission",
        icon: "📄",
        path: "/dashboard/supervisor/reports",
      },
      {
        name: "Assign Duties",
        icon: "👥",
        path: "/dashboard/supervisor/duties",
      },
    ],
    delivery: [
      { name: "Manage Shipments", icon: "🚚", path: "/dashboard/delivery" },
      { name: "View Order", icon: "📦", path: "/dashboard/delivery/orders" },
      {
        name: "Generate Invoices",
        icon: "📄",
        path: "/dashboard/delivery/invoices",
      },
    ],
    vendor: [
      { name: "Stock Needs", icon: "📦", path: "/dashboard/vendor" },
      { name: "Item Status", icon: "📊", path: "/dashboard/vendor/status" },
      { name: "Submit Pricing", icon: "💰", path: "/dashboard/vendor/pricing" },
    ],
    employee: [
      { name: "Assigned Tasks", icon: "✓", path: "/dashboard/employee" },
      { name: "Progress", icon: "📈", path: "/dashboard/employee/progress" },
    ],
  };

  const currentRole = user?.role || "admin";
  const currentMenu = menuItems[currentRole] || menuItems.admin;

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`w-64 ${darkMode ? "bg-gray-800" : "bg-white"} border-r ${
          darkMode ? "border-gray-700" : "border-gray-200"
        } flex flex-col`}
      >
        {/* App Logo */}
        <div className="p-4 flex items-center space-x-2">
          <div
            className={`w-8 h-8 rounded-md ${
              darkMode ? "bg-purple-600" : "bg-purple-500"
            } flex items-center justify-center text-white font-bold`}
          >
            P
          </div>
          <span className="font-semibold text-lg">PoshPointHub</span>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <h2 className="px-4 text-lg font-medium mb-4 capitalize">
            {currentRole} Menu
          </h2>
          <nav>
            {currentMenu.map((item, index) => (
              <a
                key={index}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                className={`flex items-center px-4 py-3 ${
                  location.pathname === item.path
                    ? darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-purple-50 text-purple-700"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className={`h-16 ${darkMode ? "bg-gray-800" : "bg-white"} border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } flex items-center justify-between px-6`}
        >
          {/* Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className={`h-5 w-5 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className={`pl-10 pr-4 py-2 rounded-md ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-gray-900 border-gray-300"
              } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>

          {/* Right side of header */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {darkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              )}
            </button>

            {/* Notifications */}
            <Notifications darkMode={darkMode} />

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <img
                src={user?.avatar || "/api/placeholder/40/40"}
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
              <span
                className={`font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {user?.name || "User"}
              </span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main
          className={`flex-1 overflow-y-auto p-6 ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
