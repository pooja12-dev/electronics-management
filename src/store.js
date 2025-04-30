import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import inventoryReducer from './slice/inventorySlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    inventory: inventoryReducer,

  },
});

export default store;
