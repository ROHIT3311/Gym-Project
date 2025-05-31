// src/redux/store.js (or wherever your store is located)
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../services/AuthSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";
import sportTypeReducer from "../services/sportSlice";
import coachesNameReducer from "../services/coachSlice";
import availableTimeSlotReducer from "../services/availableTimeSlotSlice";
// Combine reducers if you add more in the future
const rootReducer = combineReducers({
  auth: authReducer,
  sportType: sportTypeReducer,
  coaches: coachesNameReducer,
  time_slot: availableTimeSlotReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
