import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import kanbanBoard from "./slice/kanbanBoard";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  [kanbanBoard.name]: kanbanBoard.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//* optional, but required for refetchOnFocus/refetchOnReconnect behaviors
//* see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
