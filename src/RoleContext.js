import { useState, useEffect, createContext, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase"; // Ensure this is your firebase config

const RoleContext = createContext();

export const useRole = () => {
  return useContext(RoleContext);
};

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null); // Track the role
  const [loading, setLoading] = useState(true); // Track the loading state
  const [email, setEmail] = useState(null); // Track the email

  useEffect(() => {
    // Set up the auth state listener
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setRole(userData.role); // Set the role from Firestore
          setEmail(userData.email); // Set the email from Firestore
        }
      } else {
        // No user is signed in
        setRole(null);
        setEmail(null);
      }
      setLoading(false); // Data is fetched, stop loading
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []); // Only run on mount

  return (
    <RoleContext.Provider value={{ role, email, loading }}>
      {children}
    </RoleContext.Provider>
  );
};
