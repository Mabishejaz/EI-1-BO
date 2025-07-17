
import { configureStore } from '@reduxjs/toolkit';
import emailsReducer from './emailsSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    emails: emailsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
