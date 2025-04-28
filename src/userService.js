// userService.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import Firestore instance

export const saveUserToFirestore = async (userId, email, role) => {
  const userRef = doc(db, "users", userId); // Reference to the user document in Firestore

  try {
    await setDoc(userRef, {
      email: email, // Store the email as user identifier
      role: role, // Store the user's role
      createdAt: new Date(), // Store creation date
    });
    console.log("User data saved successfully!");
    return true; // Return success flag
  } catch (error) {
    console.error("Error saving user data: ", error.message);
    return false; // Return failure flag
  }
};
