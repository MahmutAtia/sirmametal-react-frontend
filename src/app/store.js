import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';
import exportcompanySlice from '../features/exportcompanySlice';

export const store = configureStore({
  reducer: {
    user:userSlice.reducer,
    url:exportcompanySlice.reducer
  },
});
