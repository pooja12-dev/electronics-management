import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommonForm = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const roles = [
    { id: "administrator", label: "Administrator", icon: "🔑" },
    { id: "manager", label: "Manager", icon: "📊" },
    { id: "supervisor", label: "Supervisor", icon: "👤" },
    { id: "deliveryOfficer", label: "Delivery Officer", icon: "📈" },
    { id: "vendor", label: "Vendor", icon: "🏢" },
    { id: "employee", label: "Employee", icon: "🏢" },
  ];

  const handleRoleSelection = (role) => {
    console.log("Role selected:", role);
    setSelectedRole(role);
    onRoleSelect(role);
    localStorage.setItem("role", role); // <-- Save role to localStorage
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Attempting login with details:");
    console.log("Role:", selectedRole);
    console.log("Email:", email);
    console.log("Password:", password);

    if (selectedRole) {
      console.log("Login successful! Navigating to dashboard...");
      navigate(`/dashboard/${selectedRole}`);
    } else {
      console.error("Login failed: No role selected.");
      alert("Please select a role before logging in.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="hidden md:flex md:w-1/2 bg-white justify-center items-center relative">
        <img
          src="/download.jpg" // Replace with your image URL or path
          alt="Welcome Image"
          className="object-cover w-full h-full rounded-l-xl" // Ensures responsiveness and coverage
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Role Selection */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Login as:
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelection(role.id)}
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
            {selectedRole && (
              <div className="text-green-500 font-medium text-center mt-2">
                Selected role: {selectedRole}
              </div>
            )}
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Enter Your Credentials
            </h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommonForm;
