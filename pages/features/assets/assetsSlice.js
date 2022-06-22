import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const assets_URL = "http://localhost:3500/assets";

const initialState = {
  assets: [],
  status: "idle",
  error: null,
  add: false,
  edit: false,
};
export const fetchAssets = createAsyncThunk("assets/fetchAssets", async () => {
  try {
    const response = await axios.get(assets_URL);
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

export const addData = createAsyncThunk(
  "assets/addData",
  async (singleAsset) => {
    try {
      const response = await axios.post(assets_URL, singleAsset);
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const deleteData = createAsyncThunk("assets/deleteData", async (id) => {
  try {
    const response = await axios.delete(assets_URL + `/${id}`);
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});
export const deleteExpenseData = createAsyncThunk(
  "assets/deleteExpenseData",
  async ({ id, data }) => {
    try {
      const response = await axios.patch(assets_URL + `/${id}`, {
        expenses: data,
      });
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const updateLiability = createAsyncThunk(
  "assets/updateLiability",
  async ({ id, data }) => {
    try {
      const response = await axios.put(assets_URL + `/${id}`, data);
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    toggleEdit: (state) => {
      state.edit = !state.edit;
    },
    toggleAddAsset: (state) => {
      state.add = !state.add;
    },
    addSingleAsset: (state, { payload }) => {
      state.assets.push(payload);
    },

    deleteSingleAsset: (state, { payload }) => {
      state.assets = state.assets.filter(
        (singleAsset) => singleAsset.id !== payload
      );
    },
    removeSingleAssetExpense: (state, { payload }) => {
      const index = state.assets.findIndex(
        (singleAsset) => singleAsset.id === payload.id2
      );

      const newExpenses = state.assets[index].expenses.filter(
        (exp) => exp.id !== payload.id1
      );

      state.assets[index].expenses = newExpenses;
      state.assets[index].amount = state.assets[index].expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
    },
    updateSingleAsset: (state, { payload }) => {
      const index = state.assets.findIndex(
        (singleAsset) => singleAsset.id === payload.id
      );

      state.assets[index] = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAssets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.status = "succeed";
        console.log(action);
        state.assets = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
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
      .addCase(deleteExpenseData.fulfilled, (state, action) => {
        state.status = "succeed";
      })
      .addCase(updateLiability.fulfilled, (state, action) => {
        state.status = "succeed";
      });
  },
});
export const getDataStatus = (state) => state.assets.status;
export const getAssets = (state) => state.assets.assets;
export const getDataError = (state) => state.assets.error;

export const {
  updateSingleAsset,
  toggleEdit,
  toggleAddAsset,
  addSingleAsset,
  deleteSingleAsset,
  removeLiabilityExpense,
} = assetsSlice.actions;
export default assetsSlice.reducer;
