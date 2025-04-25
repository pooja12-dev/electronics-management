import React, { useState } from "react";
import CommonForm from "../components/CommonForm";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState("user");

  // Available roles for selection
  const roles = [
    { id: "administrator", label: "Administrator", icon: "🔑" },
    { id: "manager", label: "Manager", icon: "📊" },
    { id: "supervisor", label: "Supervisor", icon: "👤" },
    { id: "do", label: "Delivery officer", icon: "📈" },
    { id: "vendor", label: "Vendor", icon: "🏢" },
    { id: "employee", label: "Employee", icon: "🏢" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Left side - decorative area for larger screens */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 justify-center items-center">
        <div className="max-w-md px-8">
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome to Our Platform
          </h1>
          <p className="text-blue-100 mb-8">
            Access your role-specific dashboard and manage all your tasks in one
            place. Your experience is customized based on your role in the
            organization.
          </p>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-white font-medium">
              "This platform has streamlined our workflow and improved team
              collaboration significantly."
            </p>
            <p className="text-blue-200 mt-2">— Jane Smith, Project Manager</p>
          </div>
        </div>
      </div>

      {/* Right side - form area */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile only header */}
          <div className="block md:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome to Our Platform
            </h1>
            <p className="text-gray-600 mt-2">Please sign in to continue</p>
          </div>

          {/* Login/Signup Toggle */}
          <div className="bg-white rounded-xl shadow-md p-1 mb-6 flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-3 text-center rounded-lg font-medium transition-all duration-300 ${
                isLogin
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-3 text-center rounded-lg font-medium transition-all duration-300 ${
                !isLogin
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Signup
            </button>
          </div>

          {/* Role Selection */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              {isLogin ? "Login as:" : "Register as:"}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`
                    cursor-pointer rounded-lg border-2 p-3 transition-all duration-200 flex flex-col items-center
                    ${
                      selectedRole === role.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  <div className="text-xl mb-1">{role.icon}</div>
                  <span className="font-medium text-sm text-center">
                    {role.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Area */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* The enhanced CommonForm component will be rendered here */}
            <CommonForm isLogin={isLogin} selectedRole={selectedRole} />
          </div>

          {/* Help text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin
              ? "Don't have an account? Click Signup above"
              : "Already have an account? Click Login above"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
