import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import inventoryReducer from './slice/inventorySlice';
import invoiceReducer from './slice/invoiceSlice'; // Import the invoice reducer

const store = configureStore({
  reducer: {
    users: userReducer,
    inventory: inventoryReducer,
    invoices: invoiceReducer, // Add the invoices reducer

  },
});

export default store;
