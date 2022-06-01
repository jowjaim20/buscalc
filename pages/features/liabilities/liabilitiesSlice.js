import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  liabilities: [],
  liability: {
    id: "",
    title: "",
    amount: 0,
    expenses: [],
  },
  expense: {
    id: "",
    title: "",
    amount: 0,
  },
  edit: false,
};
const liabilitiesSlice = createSlice({
  name: "liabilities",
  initialState,
  reducers: {
    addExpenseTitle: (state, { payload }) => {
      state.expense.title = payload;
    },
    addExpenseAmount: (state, { payload }) => {
      state.expense.amount = payload;
    },
    addExpenses: (state) => {
      console.log(state);
      const newExpense = {
        ...state.expense,
        id: Math.floor(Math.random() * 100000000),
      };
      state.liability.expenses.push(newExpense);
      state.expense.amount = "";
      state.expense.title = "";
    },
    removeExpenses: (state, { payload }) => {
      const neww = state.liabilities.filter(
        (liability) => liability.id === payload.id2
      );
      //   console.log(JSON.stringify(neww));
      const sss = state.liabilities.filter(
        (liability) => liability.id === payload.id2
      );

      state.liabilities.find(
        (liability) => liability.id === payload.id2
      ).expenses = sss[0].expenses.filter((exp) => exp.id !== payload.id1);
    },
    LiabilityTotalExpenses: (state, { payload }) => {
      const total = payload.reduce(
        (acc, liability) => acc + liability.amount,
        0
      );
      state.liability.amount = total;
    },
    addLiabilityTitle: (state, { payload }) => {
      state.liability.title = payload;
    },
    addLiability: (state) => {
      const newLiability = {
        ...state.liability,
        id: Math.floor(Math.random() * 100000000),
      };
      state.liabilities.push(newLiability);
      state.liability = {
        id: "",
        title: "",
        amount: 0,
        expenses: [],
      };
    },
    setEdit: (state) => {
      state.edit = !state.edit;
    },
  },
});
export const {
  LiabilityTotalExpenses,
  addExpenseTitle,
  addExpenseAmount,
  addExpenses,
  removeExpenses,
  addLiabilityTitle,
  addLiability,
  setEdit,
} = liabilitiesSlice.actions;
export default liabilitiesSlice.reducer;
