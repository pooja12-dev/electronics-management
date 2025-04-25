import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommonForm = ({ isLogin, selectedRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Form validation states
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  // Handle input blur for validation
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field);
  };

  // Validate individual field
  const validateField = (field) => {
    let newErrors = { ...errors };

    switch (field) {
      case "name":
        if (!isLogin && !name.trim()) {
          newErrors.name = "Name is required";
        } else {
          newErrors.name = "";
        }
        break;
      case "email":
        if (!email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = "Email is invalid";
        } else {
          newErrors.email = "";
        }
        break;
      case "password":
        if (!password) {
          newErrors.password = "Password is required";
        } else if (password.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        } else {
          newErrors.password = "";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return !newErrors[field];
  };

  // Validate all fields
  const validateForm = () => {
    let valid = true;
    let fields = ["email", "password"];

    if (!isLogin) {
      fields.push("name");
    }

    fields.forEach((field) => {
      const isValid = validateField(field);
      if (!isValid) valid = false;
    });

    // Mark all fields as touched
    let newTouched = {};
    fields.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all form fields
    if (validateForm()) {
      // Simulate auth with role
      console.log(
        `${isLogin ? "Logging in" : "Signing up"} with`,
        email,
        password,
        selectedRole
      );
      

      // Navigate to role-specific dashboard
      navigate(`/dashboard/${selectedRole}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      {!isLogin && (
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className={`w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all
              ${
                touched.name && errors.name
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur("name")}
            required
          />
          {touched.name && errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
      )}

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
          className={`w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all
            ${
              touched.email && errors.email
                ? "border-red-500 bg-red-50"
                : "border-gray-300"
            }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          required
        />
        {touched.email && errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="mb-6">
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
          className={`w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all
            ${
              touched.password && errors.password
                ? "border-red-500 bg-red-50"
                : "border-gray-300"
            }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur("password")}
          required
        />
        {touched.password && errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
        {isLogin && !errors.password && (
          <div className="mt-1 text-right">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot password?
            </a>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-lg font-medium"
      >
        {isLogin ? "Sign In" : "Create Account"}
      </button>

      {isLogin && (
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Accessing as{" "}
            <span className="font-medium text-blue-600">
              {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </span>
          </span>
        </div>
      )}
    </form>
  );
};

export default CommonForm;
