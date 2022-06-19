import { configureStore } from "@reduxjs/toolkit";
import liabilitiesReducer from "./features/liabilities/liabilitiesSlice";
import liabilityReducer from "./features/liabilities/liabilitySlice";
import expenseReducer from "./features/liabilities/expenseSlice";
import forEditLiabilityReducer from "./features/liabilities/forEditLiabilitySlice";
import assetsReducer from "./features/liabilities/assets/assetsSlice";

export const store = configureStore({
  reducer: {
    liabilities: liabilitiesReducer,
    liability: liabilityReducer,
    expense: expenseReducer,
    forEditLiability: forEditLiabilityReducer,
    assets: assetsReducer,
  },
});
