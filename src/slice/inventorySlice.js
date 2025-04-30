import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase'; // Ensure Firestore is correctly configured
import { collection, getDocs } from 'firebase/firestore';

export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async () => {
  const inventoryCollection = collection(db, 'inventory');
  const inventorySnapshot = await getDocs(inventoryCollection);
  const inventory = inventorySnapshot.docs.map((doc) => {
    const data = doc.data();

    // Convert Firestore Timestamps to serializable format
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null, // Convert timestamp to ISO string
    };
  });

  return inventory;
});

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default inventorySlice.reducer;
