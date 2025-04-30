import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase'; // Your Firestore instance
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

// Fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const usersCollection = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCollection);
  const users = usersSnapshot.docs.map((doc) => {
    const data = doc.data();

    // Convert Firestore Timestamps to ISO string format (serializable)
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null, // Convert to string
    };
  });

  return users;
});

// Add user
export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
  const usersCollection = collection(db, 'users');
  const docRef = await addDoc(usersCollection, newUser);
  return { id: docRef.id, ...newUser };
});

// Update user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (updatedUser) => {
    const userDocRef = doc(db, 'users', updatedUser.id);
    await updateDoc(userDocRef, updatedUser);
    return updatedUser;
  }
);

// Delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  const userDocRef = doc(db, 'users', id);
  await deleteDoc(userDocRef);
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
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

      // Add user
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
