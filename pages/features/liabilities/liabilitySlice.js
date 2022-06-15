import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  liability: {
    id: "",
    title: "",
    amount: 0,
    expenses: [],
  },
};

const liabilitySlice = createSlice({
  name: "liability",
  initialState,
  reducers: {
    addLiabilityTitle: (state, { payload }) => {
      state.liability.title = payload;
      state.liability.id = Math.floor(Math.random() * 1000);
    },

    addLiabilityExpense: (state, { payload }) => {
      state.liability.expenses.push(payload);
    },
    removeExpenseModal: (state, { payload }) => {
      state.liability.expenses = state.liability.expenses.filter(
        (expense) => expense.id !== payload
      );
    },
    clearLiability: (state) => {
      state.liability.id = "";
      state.liability.title = "";
      state.liability.amount = 0;
      state.liability.expenses = [];
    },
    updateAmount: (state) => {
      state.liability.amount = state.liability.expenses.reduce(
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
} = liabilitySlice.actions;
export default liabilitySlice.reducer;
