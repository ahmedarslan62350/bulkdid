import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getUserApi } from "../reduxApi";
import { persistReducer, persistStore } from "redux-persist";
import storage from "../storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [], // Persist only the API cache
};

const rootReducer = combineReducers({
  [getUserApi.reducerPath]: getUserApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      getUserApi.middleware
    ),
});

setupListeners(store.dispatch);

export type userState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);
