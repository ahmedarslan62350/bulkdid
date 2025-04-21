import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import userSlice from "@/redux/slices/userSlice";
import adminSlice from "@/redux/slices/adminSlice";
import analyticsSlice from "@/redux/slices/analyticsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userSlice,
  admin: adminSlice,
  analytics: analyticsSlice,
});

export const rootStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
