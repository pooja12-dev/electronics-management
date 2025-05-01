import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import inventoryReducer from "./slice/inventorySlice";
import invoiceReducer from "./slice/invoiceSlice"; // Import the invoice reducer
import taskReducer from "./slice/taskSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    inventory: inventoryReducer,
    invoices: invoiceReducer, // Add the invoices reducer
    tasks: taskReducer,
  },
});

export default store;
