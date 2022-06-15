import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forEditLiability: {
    id: "",
    title: "",
    amount: 0,
    expenses: [],
  },
};

const forEditLiabilitySlice = createSlice({
  name: "forEditLiability",
  initialState,
  reducers: {
    forEditAddLiabilityTitle: (state, { payload }) => {
      state.forEditLiability.title = payload;
    },
    forEditAddLiabilityId: (state, { payload }) => {
      state.forEditLiability.id = payload;
    },

    forEditAddLiabilityExpense: (state, { payload }) => {
      state.forEditLiability.expenses = payload;
    },
    forEditPushLiabilityExpense: (state, { payload }) => {
      state.forEditLiability.expenses.push(payload);
    },
    forEditRemoveExpenseModal: (state, { payload }) => {
      state.forEditLiability.expenses = state.forEditLiability.expenses.filter(
        (expense) => expense.id !== payload
      );
    },
    forEditClearLiability: (state) => {
      state.forEditLiability.id = "";
      state.forEditLiability.title = "";
      state.forEditLiability.amount = 0;
      state.forEditLiability.expenses = [];
    },
    forEditUpdateAmount: (state) => {
      state.forEditLiability.amount = state.forEditLiability.expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
    },
  },
});
export const {
  forEditRemoveExpenseModal,
  forEditAddLiabilityTitle,
  forEditAddLiabilityExpense,
  forEditPushLiabilityExpense,
  forEditClearLiability,
  forEditUpdateAmount,
  forEditAddLiabilityId,
} = forEditLiabilitySlice.actions;
export default forEditLiabilitySlice.reducer;
