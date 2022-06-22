import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forEditSingleAsset: {
    id: "",
    title: "",
    amount: 0,
    expenses: [],
  },
};

const forEditSingleAssetSlice = createSlice({
  name: "forEditSingleAsset",
  initialState,
  reducers: {
    forEditAddLiabilityTitle: (state, { payload }) => {
      state.forEditSingleAsset.title = payload;
    },
    forEditAddLiabilityId: (state, { payload }) => {
      state.forEditSingleAsset.id = payload;
    },

    forEditAddLiabilityExpense: (state, { payload }) => {
      state.forEditSingleAsset.expenses = payload;
    },
    forEditPushLiabilityExpense: (state, { payload }) => {
      state.forEditSingleAsset.expenses.push(payload);
    },
    forEditRemoveExpenseModal: (state, { payload }) => {
      state.forEditSingleAsset.expenses = state.forEditSingleAsset.expenses.filter(
        (expense) => expense.id !== payload
      );
    },
    forEditClearLiability: (state) => {
      state.forEditSingleAsset.id = "";
      state.forEditSingleAsset.title = "";
      state.forEditSingleAsset.amount = 0;
      state.forEditSingleAsset.expenses = [];
    },
    forEditUpdateAmount: (state) => {
      state.forEditSingleAsset.amount = state.forEditSingleAsset.expenses.reduce(
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
} = forEditSingleAssetSlice.actions;
export default forEditSingleAssetSlice.reducer;
