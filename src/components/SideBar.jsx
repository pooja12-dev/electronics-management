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
              <Link to="/system-overview" className="w-full">
                System Overview
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to="/user-management" className="w-full">
                User Management
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to="/invoices" className="w-full">
                Invoices
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to="/reports" className="w-full">
                Reports
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to="/task-assignment" className="w-full">
                Task assignment
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to="/inventory-management" className="w-full">
                Inventory Management
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to="/teams-data" className="w-full">
                Teams Data
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to="/production-stats" className="w-full">
                Production Stats
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to="/shipments" className="w-full">
                Shipments
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to="/orders" className="w-full">
                Orders
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to="/stock-needs" className="w-full">
                Stock needs
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to="/item-status" className="w-full">
                Item Status
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to="/pricing" className="w-full">
                Submit Pricing
              </Link>
            </div>
            <div className="flex items-center py-2 hover:bg-gray-100 px-2 rounded cursor-pointer">
              <UserManagementIcon />
              <Link to="/progress" className="w-full">
                Progress of each employee
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
