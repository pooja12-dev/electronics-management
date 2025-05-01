import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

// Fetch Users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);
  return usersSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null, // Convert Timestamp to ISO string
    };
  });
});

// Add User
export const addUser = createAsyncThunk("users/addUser", async (newUser) => {
  const userWithTimestamp = { ...newUser, createdAt: serverTimestamp() };
  const userRef = await addDoc(collection(db, "users"), userWithTimestamp);
  return { id: userRef.id, ...userWithTimestamp };
});

// Update User
export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  const userRef = doc(db, "users", user.id);
  await updateDoc(userRef, user);
  return user;
});

// Delete User
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await deleteDoc(doc(db, "users", id));
  return id;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
