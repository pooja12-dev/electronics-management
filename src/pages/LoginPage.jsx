import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../components/CommonForm"; // Import CommonForm (if needed for more forms)

const LoginPage = ({ selectedRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const sessionData = {
        email,
        role: selectedRole,
        timestamp: new Date().toISOString(),
      };
      sessionStorage.setItem("userSession", JSON.stringify(sessionData));
      console.log(selectedRole, "selectedrole");
      navigate(`/dashboard/${selectedRole}`);
    } else {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full bg-white rounded-xl shadow-md p-6"
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
        Sign In
      </button>
    </form>
  );
};

export default LoginPage;
