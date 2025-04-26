import React, { useState } from "react";
import LoginPage from "../pages/LoginPage"; // Import LoginPage

const CommonForm = () => {
  const [selectedRole, setSelectedRole] = useState("user");

  const roles = [
    { id: "administrator", label: "Administrator", icon: "🔑" },
    { id: "manager", label: "Manager", icon: "📊" },
    { id: "supervisor", label: "Supervisor", icon: "👤" },
    { id: "deliveryOfficer", label: "Delivery officer", icon: "📈" },
    { id: "vendor", label: "Vendor", icon: "🏢" },
    { id: "employee", label: "Employee", icon: "🏢" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="hidden md:flex md:w-1/2 bg-blue-600 justify-center items-center">
        <div className="max-w-md px-8">
          <h1 className="text-4xl font-bold text-white mb-6">Welcome</h1>
          <p className="text-blue-100 mb-8">
            Role-specific management platform.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Login as:
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`cursor-pointer rounded-lg border-2 p-3 flex flex-col items-center ${
                    selectedRole === role.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="text-xl mb-1">{role.icon}</div>
                  <span className="font-medium text-sm text-center">
                    {role.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pass selectedRole to LoginPage as prop */}
          <LoginPage selectedRole={selectedRole} />
        </div>
      </div>
    </div>
  );
};

export default CommonForm;
