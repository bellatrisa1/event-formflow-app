import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './store/formsSlice';
import uiReducer from './store/uiSlice';
import authReducer from './store/authSlice';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    ui: uiReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['forms/addForm', 'forms/updateForm'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
