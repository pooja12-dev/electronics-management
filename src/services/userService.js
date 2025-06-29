// userService.js
import {
  doc,
  setDoc,
  getDoc,
 addDoc,
 serverTimestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "./firebase"; // Import Firestore instance


export const saveUserToFirestore = async (userId, email, role, name) => {
  const userRef = doc(db, "users", userId); // Reference to the user document in Firestore

  try {
    await setDoc(userRef, {
      email: email, // Store the email as user identifier
      role: role, // Store the user's role
      createdAt: new Date(), // Store creation date
      name: name,
    });
    console.log("User data saved successfully!");
    return true; // Return success flag
  } catch (error) {
    console.error("Error saving user data: ", error.message);
    return false; // Return failure flag
  }
};

// Fetch users and roles
// Function to fetch users and their roles
export const getUserRoleFromFirestore = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data().role; // Fetch role
    } else {
      throw new Error("User document not found");
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
};


export async function createTask({ taskName, assigneeId, reporterId, dueDate }){
    const taskRef = collection(db, "tasks");
    await addDoc(taskRef, {
      "task-name": taskName,
      Assignee: assigneeId,
      Reporter: reporterId,
      "Due date": dueDate,
      Status: "pending",
      Progress: "0%",
      CreatedAt: serverTimestamp()
    });
}

//create tasks and assign  to users
