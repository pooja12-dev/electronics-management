import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../components/CommonForm";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const roles = [
    { id: "administrator", label: "Administrator", icon: "🔑" },
    { id: "manager", label: "Manager", icon: "📊" },
    { id: "supervisor", label: "Supervisor", icon: "👤" },
    { id: "deliveryOfficer", label: "Delivery officer", icon: "📈" },
    { id: "vendor", label: "Vendor", icon: "🏢" },
    { id: "employee", label: "Employee", icon: "🏢" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const sessionData = {
        email,
        role: selectedRole,
        timestamp: new Date().toISOString(),
      };
      sessionStorage.setItem("userSession", JSON.stringify(sessionData));
      navigate(`/dashboard/${selectedRole}`);
    } else {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Left side */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 justify-center items-center">
        <div className="max-w-md px-8">
          <h1 className="text-4xl font-bold text-white mb-6">Welcome</h1>
          <p className="text-blue-100 mb-8">
            Role-specific management platform.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              {isLogin ? "Login as:" : "Register as:"}
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

          <form
            onSubmit={handleLogin}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full p-3 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
