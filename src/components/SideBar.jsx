import React from "react";
import { Link } from "react-router-dom";

// Icon components
const SystemOverviewIcon = () => (
  <span className="text-blue-500 text-xl mr-2">📊</span>
);
const UserManagementIcon = () => (
  <span className="text-purple-500 text-xl mr-2">👥</span>
);

const Sidebar = ({ role, isOpen }) => {
  const renderMenu = () => {
    switch (role) {
      case "administrator":
        return (
          <div className="space-y-4">
            <div className="font-semibold text-xl mb-6 mt-2">
              Administrator Menu
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <SystemOverviewIcon />
              <Link
                to={`/dashboard/${role}/system-overview`}
                className="w-full"
              >
                System Overview
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/logs`} className="w-full">
                Logs
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link
                to={`/dashboard/${role}/user-management`}
                className="w-full"
              >
                User Management
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/shipments`} className="w-full">
                Shipment
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link
                to={`/dashboard/${role}/security-settings`}
                className="w-full"
              >
                Security Settings
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/assign-tasks`} className="w-full">
                Task Assignment
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/invoices`} className="w-full">
                Invoices
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link
                to={`/dashboard/${role}/inventory-management`}
                className="w-full"
              >
                Inventory Management
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/teams-data`} className="w-full">
                Team Data
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link
                to={`/dashboard/${role}/production-stats`}
                className="w-full"
              >
                Production Stats
              </Link>
            </div>

            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/order-view`} className="w-full">
                Order View
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/stock-needs`} className="w-full">
                Stock Needs
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link
                to={`/dashboard/${role}/employee-progress`}
                className="w-full"
              >
                Employee Progress
              </Link>
            </div>
            {/* Add other routes as needed */}
          </div>
        );
      case "manager":
        return (
          <div className="space-y-4">
            <div className="font-semibold text-xl mb-6 mt-2">Manager Menu</div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link
                to={`/dashboard/${role}/user-management`}
                className="w-full"
              >
                User Management
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/logs`} className="w-full">
                Logs
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/teams-data`} className="w-full">
                Team Data
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/assign-tasks`} className="w-full">
                Task Assignment
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link
                to={`/dashboard/${role}/inventory-management`}
                className="w-full"
              >
                Inventory Management
              </Link>
            </div>

            {/* Add other routes as needed */}
          </div>
        );
      case "supervisor":
        return (
          <div className="space-y-4">
            <div className="font-semibold text-xl mb-6 mt-2">
              Supervisor Menu
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/assign-tasks`} className="w-full">
                Task Assignment
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/logs`} className="w-full">
                Logs
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link
                to={`/dashboard/${role}/production-stats`}
                className="w-full"
              >
                Production Stats
              </Link>
            </div>
          </div>
        );
      case "vendor":
        return (
          <div className="space-y-4">
            <div className="font-semibold text-xl mb-6 mt-2">
              Supervisor Menu
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/stock-needs`} className="w-full">
                Stock Needs
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/item-status`} className="w-full">
                Update Item Status
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/pricing`} className="w-full">
                Pricing
              </Link>
            </div>
          </div>
        );
      case "deliveryOfficer":
        return (
          <div className="space-y-4">
            <div className="font-semibold text-xl mb-6 mt-2">DO Menu</div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/shipments`} className="w-full">
                Shipment
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/order-view`} className="w-full">
                Order View
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/invoices`} className="w-full">
                Invoices
              </Link>
            </div>
          </div>
        );
      case "employee":
        return (
          <div className="space-y-4">
            <div className="font-semibold text-xl mb-6 mt-2">Employee Menu</div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link
                to={`/dashboard/${role}/employee-progress`}
                className="w-full"
              >
                Employee Progress
              </Link>
            </div>

            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to={`/dashboard/${role}/assign-tasks`} className="w-full">
                Task Assignment
              </Link>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div className="font-semibold text-xl mb-6 mt-2">Menu</div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <SystemOverviewIcon />
              <Link to="/" className="w-full">
                Go Back Home
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <nav
      className={`${
        isOpen ? "block" : "hidden"
      } md:block w-full md:w-64 bg-white border-r shadow-sm p-4 fixed md:relative z-10 h-full overflow-y-auto`}
    >
      {renderMenu()}
    </nav>
  );
};

export default Sidebar;
