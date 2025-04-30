import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase'; // Your Firestore instance
import { collection, getDocs } from 'firebase/firestore';

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
      });
  },
});

export default userSlice.reducer;
