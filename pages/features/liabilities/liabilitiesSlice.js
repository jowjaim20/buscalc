import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const LIABILITIES_URL = "http://localhost:3500/liabilities";

const initialState = {
  liabilities: [],
  status: "idle",
  error: null,
  add: false,
  edit: false,
};
export const fetchData = createAsyncThunk("liabilities/fetchData", async () => {
  try {
    const response = await axios.get(LIABILITIES_URL);
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

export const addData = createAsyncThunk(
  "liabilities/addData",
  async (liability) => {
    try {
      const response = await axios.post(LIABILITIES_URL, liability);
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const deleteData = createAsyncThunk(
  "liabilities/deleteData",
  async (id) => {
    try {
      const response = await axios.delete(LIABILITIES_URL + `/${id}`);
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const deleteExpeseData = createAsyncThunk(
  "liabilities/deleteExpenseData",
  async (id, id2) => {
    try {
      const response = await axios.delete(LIABILITIES_URL + `/${id}/${id2}`);
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

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

      state.liabilities[index] = payload.liabilities;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeed";
        console.log(action);
        state.liabilities = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        state.error = `${action.error.message} ${action.type}`;
      })
      .addCase(addData.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addData.rejected, (state, action) => {
        state.error = `${action.error.message} ${action.type}`;
        state.status = "failed";
      })
      .addCase(deleteExpeseData.fulfilled, (state, action) => {
        state.status = "succeed";
      });
  },
});

export const getDataStatus = (state) => state.liabilities.status;
export const getDataError = (state) => state.liabilities.error;

export const {
  UpdateLiability,
  toggleEdit,
  tooggleAdd,
  addLiability,
  deleteLiability,
  removeLiabilityExpense,
} = liabilitiesSlice.actions;
export default liabilitiesSlice.reducer;
