import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// Fetch inventory
export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async () => {
    const inventoryCollection = collection(db, "inventory");
    const inventorySnapshot = await getDocs(inventoryCollection);
    const inventory = inventorySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt:
          data.createdAt && typeof data.createdAt.toDate === "function"
            ? data.createdAt.toDate().toISOString()
            : data.createdAt || null,
      };
    });
    return inventory;
  }
);

// Add product
export const addProductToStore = createAsyncThunk(
  "inventory/addProduct",
  async (product) => {
    const docRef = await addDoc(collection(db, "inventory"), product);
    return { id: docRef.id, ...product };
  }
);

// Edit product
export const editProductInStore = createAsyncThunk(
  "inventory/editProduct",
  async (product) => {
    const productRef = doc(db, "inventory", product.id);
    await updateDoc(productRef, product);
    return product;
  }
);

// Inventory slice
const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    data: [],
    loading: false,
    error: null,
    categoryFilter: "",
  },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
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
      })
      .addCase(addProductToStore.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editProductInStore.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export const { setCategoryFilter } = inventorySlice.actions;

export default inventorySlice.reducer;
