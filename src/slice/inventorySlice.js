import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase"; // Ensure Firestore is correctly configured
import { collection, getDocs } from "firebase/firestore";

// Fetch inventory items from Firestore
export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async () => {
    const inventoryCollection = collection(db, "inventory");
    const inventorySnapshot = await getDocs(inventoryCollection);
    const inventory = inventorySnapshot.docs.map((doc) => {
      const data = doc.data();

      // Safely handle Firestore Timestamps
      const createdAt =
        data.createdAt && data.createdAt.toDate
          ? data.createdAt.toDate().toISOString()
          : null;

      return {
        id: doc.id,
        ...data,
        createdAt, // Ensure createdAt is properly formatted if it exists
      };
    });

    return inventory;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
  },
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
        console.error(
          "[InventorySlice] Fetch Inventory Rejected:",
          action.error.message
        );
      });
  },
});

export const { setProducts } = inventorySlice.actions;

export default inventorySlice.reducer;
