import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Async Thunk to fetch invoices from Firestore
export const fetchInvoices = createAsyncThunk('invoices/fetchInvoices', async () => {
  const invoiceCollection = collection(db, 'invoices');
  const querySnapshot = await getDocs(invoiceCollection);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      customer: data.Customer,
      description: data.Description,
      date: data.date.toDate().toISOString(), // Convert to ISO string
      status: data.status,
      total: data.total,
      type: data.type,
    };
  });
});

// Async Thunk to add a new invoice to Firestore
export const addInvoice = createAsyncThunk('invoices/addInvoice', async (invoiceData) => {
  const invoiceCollection = collection(db, 'invoices');
  const newInvoice = await addDoc(invoiceCollection, {
    Customer: invoiceData.customer,
    Description: invoiceData.description,
    date: invoiceData.date,
    status: invoiceData.status,
    total: invoiceData.total,
    type: invoiceData.type,
  });
  return {
    id: newInvoice.id,
    ...invoiceData, // Include all invoice data along with the generated ID
  };
});

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch invoices
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add a new invoice
      .addCase(addInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload); // Add the new invoice to the state
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default invoiceSlice.reducer;
