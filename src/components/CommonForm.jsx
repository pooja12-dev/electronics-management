import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Ensure this points to your Firebase config file
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const CommonForm = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  onst[(isLogin, setIsLogin)] = useState(true);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      alert("Please select a role before logging in.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      navigate(`/dashboard/${selectedRole}`);
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed: " + error.message);
    }
  };
  //login function with firebase

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      alert("Please select a role before registering.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);
      alert("Registration successful! Please log in.");
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Registration failed: " + error.message);
    }
  };
  //register function with firebase

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          {isLogin ? "Login as:" : "Register as:"}
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

      <form
        onSubmit={isLogin ? handleLogin : handleRegister}
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
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          className="text-blue-600 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default CommonForm;
