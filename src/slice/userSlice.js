import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

// Fetch Users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const usersCollection = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCollection);
  return usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
});

// Add User
export const addUser = createAsyncThunk('users/addUser', async (user) => {
  const usersCollection = collection(db, 'users');
  const newUser = {
    ...user,
    createdAt: new Date().toISOString(),
  };
  const docRef = await addDoc(usersCollection, newUser);
  return { id: docRef.id, ...newUser };
});

// Update User
export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  const userDoc = doc(db, 'users', user.id);
  await updateDoc(userDoc, user);
  return user;
});

// Delete User
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  const userDoc = doc(db, 'users', id);
  await deleteDoc(userDoc);
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
        const index = state.data.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
