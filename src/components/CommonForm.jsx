import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore"; //to get user role
import { auth, googleProvider } from "../firebase"; // Ensure this points to your Firebase config file
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { saveUserToFirestore } from "../userService"; // Import Firestore service
import { useRole } from "../RoleContext"; // Import the context hook
const CommonForm = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { updateRole } = useRole(); // Get the function to update the role
  const [name, setName] = useState(""); // New state for name
  const [userRole, setUserRole] = useState(null); // State for storing the user role
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
    // const usersSnapshot = await getDocs(collection(db, "users"));
    // console.log("usersSnapshot", usersSnapshot);
    // This effect could be used to handle other logic based on the user's role
    if (userRole) {
      console.log("Role updated:", userRole);
      // You can fetch data based on the role or trigger other actions
    }
  }, [userRole]); // Trigger effect when userRole changes
  const handleRoleSelection = (role) => {
    console.log("Role selected:", role);
    setSelectedRole(role);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // if (!selectedRole) {
    //   alert("Please select a role before logging in.");
    //   return;
    // }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("users from cf", user);

      // Fetch user data (role) from Firestore
      const userRef = doc(db, "users", user.uid);
      console.log("users ref from cf", userRef);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userRole = userData.role; // Fetch the current role from Firestore
        console.log("User logged in with role:", userRole);

        // Navigate to the dashboard based on the role
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

    // Ensure a role is selected before continuing
    if (!selectedRole) {
      alert("Please select a role before registering.");
      return;
    }

    setIsLoading(true);

    try {
      // Register the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Ensure userCredential is valid before accessing user data
      if (userCredential && userCredential.user) {
        console.log("User registered:", userCredential.user);

        // After registration, save user data to Firestore
        const saveResult = await saveUserToFirestore(
          userCredential.user.uid,
          email,
          selectedRole,
          name
        );
        if (saveResult) {
          alert("Registration successful! Please log in.");
          setIsLogin(true); // Switch to login view after successful registration
        } else {
          alert("Error saving user data to Firestore.");
        }
      } else {
        throw new Error("Registration failed. User credential is invalid.");
      }
    } catch (error) {
      console.error("Registration failed:", error.message);

      // Handle specific error cases
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

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        role: selectedRole,
      });

      // Wait for Firestore to confirm
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const savedRole = docSnap.data().role;
        alert("Google Sign-in successful!");

        // You can optionally update RoleContext here too (if it's manually managed)
        // setRole(savedRole); // if you expose this via context

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

      // Fetch role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        console.log("User logged in with role:", role);

        // Store in localStorage (optional but useful for RoleContext fallback)
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
            role: role, // store the role too
          })
        );

        // Navigate only after role is known
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
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="hidden md:flex md:w-1/2 bg-white justify-center items-center relative">
          <img
            src="/download.jpg" // Replace with your image URL or path
            alt="Welcome Image"
            className="object-cover w-full h-full rounded-l-xl" // Ensures responsiveness and coverage
          />
        </div>
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
        </div>

        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Enter Your Credentials
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="registerName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your name"
              required
            />
          </div>
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
        {!isLogin ? (
          <div className="mt-4">
            <button
              onClick={() => handleGoogleSignIn(selectedRole)}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Login in with Google
            </button>
          </div>
        )}
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
    </>
  );
};

export default CommonForm;
