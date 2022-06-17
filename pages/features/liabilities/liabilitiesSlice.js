import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  liabilities: [],
  add: false,
  edit: false,
};
const liabilitiesSlice = createSlice({
  name: "liabilities",
  initialState,
  reducers: {
    toggleEdit: (state) => {
      state.edit = !state.edit;
    },
    tooggleAdd: (state) => {
      state.add = !state.add;
    },
    addLiability: (state, { payload }) => {
      state.liabilities.push(payload);
    },

    deleteLiability: (state, { payload }) => {
      state.liabilities = state.liabilities.filter(
        (liability) => liability.id !== payload
      );
    },
    removeLiabilityExpense: (state, { payload }) => {
      const index = state.liabilities.findIndex(
        (liability) => liability.id === payload.id2
      );

      const newExpenses = state.liabilities[index].expenses.filter(
        (exp) => exp.id !== payload.id1
      );

      state.liabilities[index].expenses = newExpenses;
      state.liabilities[index].amount = state.liabilities[
        index
      ].expenses.reduce((acc, expense) => acc + expense.amount, 0);
    },
    UpdateLiability: (state, { payload }) => {
      const index = state.liabilities.findIndex(
        (liability) => liability.id === payload.id
      );

      state.liabilities[index] = payload;
    },
  },
});
export const {
  UpdateLiability,
  toggleEdit,
  tooggleAdd,
  addLiability,
  deleteLiability,
  removeLiabilityExpense,
} = liabilitiesSlice.actions;
export default liabilitiesSlice.reducer;
