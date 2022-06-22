import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleAsset: {
    id: "",
    title: "",
    amount: 0,
    expenses: [],
  
  },
};

const singleAssetSlice = createSlice({
  name: "singleAsset",
  initialState,
  reducers: {
    addLiabilityTitle: (state, { payload }) => {
      state.singleAsset.title = payload;
      state.singleAsset.id = Math.floor(Math.random() * 1000);
    },

    addLiabilityExpense: (state, { payload }) => {
      state.singleAsset.expenses.push(payload);
    },
    removeExpenseModal: (state, { payload }) => {
      state.singleAsset.expenses = state.singleAsset.expenses.filter(
        (expense) => expense.id !== payload
      );
    },
    clearLiability: (state) => {
      state.singleAsset.id = "";
      state.singleAsset.title = "";
      state.singleAsset.amount = 0;
      state.singleAsset.expenses = [];
    },
    updateAmount: (state) => {
      state.singleAsset.amount = state.singleAsset.expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
    },
  },
});
export const {
  removeExpenseModal,
  addLiabilityTitle,
  addLiabilityExpense,
  clearLiability,
  updateAmount,
} = singleAssetSlice.actions;
export default singleAssetSlice.reducer;
