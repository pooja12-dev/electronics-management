// RoleContext.js
import { useState, useEffect, createContext, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase"; // Ensure this is your firebase config

const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null); // Track the user's role
  const [loading, setLoading] = useState(true); // Track loading state
  const [email, setEmail] = useState(null); // Track user's email
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role); // Set the role
            setEmail(userData.email); // Set the email
          } else {
            setError("User document does not exist.");
          }
        } catch (err) {
          setError("Error fetching user data: " + err.message);
        }
      } else {
        setRole(null);
        setEmail(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <RoleContext.Provider value={{ role, email, loading, error }}>
      {children}
    </RoleContext.Provider>
  );
};
