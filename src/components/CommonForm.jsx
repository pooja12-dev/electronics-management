import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Ensure this points to your Firebase config file
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { saveUserToFirestore } from "./userService"; // Import Firestore service
const CommonForm = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(""); // New state for name

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

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      // After login, check if user exists in Firestore and add data if not
      await saveUserToFirestore(userCredential.user.uid, name, selectedRole);
      navigate(`/dashboard/${selectedRole}`);
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      alert("Please select a role before registering.");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);
      // After login, check if user exists in Firestore and add data if not
      await saveUserToFirestore(userCredential.user.uid, name, selectedRole);
      alert("Registration successful! Please log in.");
      setIsLogin(true); // Switch to login view after successful registration
    } catch (error) {
      console.error("Registration failed:", error.message);
      if (error.code === "auth/email-already-in-use") {
        alert("The email is already in use. Please use a different email.");
      } else if (error.code === "auth/weak-password") {
        alert("The password is too weak. Please use a stronger password.");
      } else {
        alert("Registration failed: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : isLogin ? "Login" : "Register"}
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
