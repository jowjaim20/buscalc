import { configureStore } from "@reduxjs/toolkit";
import liabilitiesReducer from "./features/liabilities/liabilitiesSlice";

export const store = configureStore({
  reducer: {
    liabilities: liabilitiesReducer,
  },
});
