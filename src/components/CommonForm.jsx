import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { saveUserToFirestore } from "../userService";
import { useRole } from "../RoleContext";

const CommonForm = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { updateRole } = useRole();
  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState(null);
  const db = getFirestore();

  const navigate = useNavigate();

  const roles = [
    { id: "administrator", label: "Administrator", icon: "🔑" },
    { id: "manager", label: "Manager", icon: "📊" },
    { id: "supervisor", label: "Supervisor", icon: "👤" },
    { id: "deliveryOfficer", label: "Delivery Officer", icon: "📈" },
    { id: "vendor", label: "Vendor", icon: "🏢" },
    { id: "employee", label: "Employee", icon: "🏢" },
  ];

  useEffect(() => {
    if (userRole) {
      console.log("Role updated:", userRole);
    }
  }, [userRole]);

  const handleRoleSelection = (role) => {
    console.log("Role selected:", role);
    setSelectedRole(role);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("users from cf", user);

      const userRef = doc(db, "users", user.uid);
      console.log("users ref from cf", userRef);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userRole = userData.role;
        console.log("User logged in with role:", userRole);

        navigate(`/dashboard/${userRole}`);
      } else {
        console.error("No such user found in Firestore!");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed: " + error.message);
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

      if (userCredential && userCredential.user) {
        console.log("User registered:", userCredential.user);

        const saveResult = await saveUserToFirestore(
          userCredential.user.uid,
          email,
          selectedRole,
          name
        );
        if (saveResult) {
          alert("Registration successful! Please log in.");
          setIsLogin(true); 
        } else {
          alert("Error saving user data to Firestore.");
        }
      } else {
        throw new Error("Registration failed. User credential is invalid.");
      }
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

  const handleGoogleSignIn = async (selectedRole) => {
    if (!selectedRole) {
      alert("Please select a role before continuing.");
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        role: selectedRole,
      });

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const savedRole = docSnap.data().role;
        alert("Google Sign-in successful!");

        navigate(`/dashboard/${savedRole}`);
      } else {
        alert("User role data not found.");
      }
      alert("Google Sign-in successful!");
      navigate(`/dashboard/${selectedRole}`);
    } catch (error) {
      console.error("Google sign-in failed:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        console.log("User logged in with role:", role);

        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
            role: role,
          })
        );

        navigate(`/dashboard/${role}`);
      } else {
        console.warn("No user role found in Firestore.");
        alert("User role not found. Please contact admin.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed: " + error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Left side - Image for larger screens */}
      <div className="hidden md:block md:w-1/2">
        <div className="h-full w-full relative">
          <img
            src="/download.jpg"
            alt="Welcome Image"
            className="object-cover h-full w-full"
          />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Role Selection Card - Only show when registering */}
          {!isLogin && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Choose your role:
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => handleRoleSelection(role.id)}
                    className={`cursor-pointer rounded-lg border-2 p-3 flex flex-col items-center transition-all ${
                      selectedRole === role.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{role.icon}</div>
                    <span className="font-medium text-sm text-center">
                      {role.label}
                    </span>
                  </div>
                ))}
              </div>
              {selectedRole && (
                <div className="text-green-600 font-medium text-center mt-3">
                  Selected role: {selectedRole}
                </div>
              )}
            </div>
          )}

          {/* Credentials Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {isLogin ? "Login to Your Account" : "Create Your Account"}
            </h2>
            <form
              onSubmit={isLogin ? handleLogin : handleRegister}
              className="space-y-4"
            >
              {/* Name field - shown only for registration */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="registerName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    required={!isLogin}
                  />
                </div>
              )}
              
              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              {/* Password field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : isLogin ? "Login" : "Register"}
              </button>
            </form>
            
            {/* Google auth button */}
            <div className="mt-4">
              <button
                onClick={isLogin ? handleGoogleLogin : () => handleGoogleSignIn(selectedRole)}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors flex items-center justify-center"
              >
                <span className="mr-2">
                  {/* Google Icon SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                  </svg>
                </span>
                {isLogin ? "Login with Google" : "Sign up with Google"}
              </button>
            </div>
            
            {/* Toggle between login and register */}
            <div className="mt-4 text-center">
              <button
                className="text-blue-600 hover:text-blue-800 underline font-medium"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setSelectedRole(null); // Reset role selection when switching modes
                }}
              >
                {isLogin
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonForm;