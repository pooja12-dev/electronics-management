// userService.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import Firestore instance

// Save user data to Firestore
export const saveUserToFirestore = async (userId, name, role) => {
  const userRef = doc(db, "users", userId); // Reference to the user document in Firestore
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    try {
      // If user data doesn't exist, create a new document
      await setDoc(userRef, {
        name: name,
        role: role,
        createdAt: new Date(),
      });
      console.log("User data saved successfully!");
    } catch (error) {
      console.error("Error saving user data: ", error);
    }
  } else {
    console.log("User data already exists.");
  }
};
