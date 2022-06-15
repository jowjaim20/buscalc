import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  expense: {
    id: "",
    title: "",
    amount: 0,
  },
};
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpenseTitle: (state, { payload }) => {
      state.expense.title = payload;
      state.expense.id = Math.floor(Math.random() * 10000);
    },
    addExpenseAmount: (state, { payload }) => {
      state.expense.amount = payload;
    },

    clearExpense: (state) => {
      state.expense.amount = "";
      state.expense.title = "";
      state.expense.id = "";
    },
  },
});
export const { addExpenseTitle, addExpenseAmount, clearExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
