import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import axios from "axios";

const LIABILITIES_URL = "http://localhost:3500/liabilities";

const firebaseConfig = {
  apiKey: "AIzaSyClcHkLVrePvXQZYFJ8Of2eFJu-psIrvL0",
  authDomain: "business-calc-a0e33.firebaseapp.com",
  projectId: "business-calc-a0e33",
  storageBucket: "business-calc-a0e33.appspot.com",
  messagingSenderId: "382871063159",
  appId: "1:382871063159:web:341d4252df6a705f1c5472",
};

initializeApp(firebaseConfig);
const db = getFirestore();

const colRef = collection(db, "liabilities");

const initialState = {
  liabilities: [],
  status: "idle",
  error: null,
  add: false,
  edit: false,
};
export const fetchData = createAsyncThunk("liabilities/fetchData", async () => {
  try {
    // const response = await axios.get(LIABILITIES_URL);
    // return response.data;
    const data = await getDocs(colRef).then((snapshot) =>
      snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
    console.log(data);
    return data;
  } catch (error) {
    throw Error(error.message);
  }
});

export const addData = createAsyncThunk(
  "liabilities/addData",
  async (liability) => {
    try {
      // const response = await axios.post(LIABILITIES_URL, liability);
      // return response.data;
      const data = await addDoc(colRef, liability).then((ba) => ba.id);

      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const deleteData = createAsyncThunk(
  "liabilities/deleteData",
  async (id) => {
    try {
      // const response = await axios.delete(LIABILITIES_URL + `/${id}`);
      // return response.data;

      const docRef = doc(db, "liabilities", id);

      const data = await deleteDoc(docRef);
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const deleteExpenseData = createAsyncThunk(
  "liabilities/deleteExpenseData",
  async ({ id, data }) => {
    try {
      // const response = await axios.patch(LIABILITIES_URL + `/${id}`, {
      //   expenses: data,
      // });
      // return response.data;

      const docRef = doc(db, "liabilities", id);

      const response = await updateDoc(docRef, {
        expenses: data,
      });
      return response;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const updateLiability = createAsyncThunk(
  "liabilities/updateLiability",
  async ({ id, data }) => {
    try {
      // const response = await axios.put(LIABILITIES_URL + `/${id}`, data);
      // return response.data;
      const docRef = doc(db, "liabilities", id);

      const response = await updateDoc(docRef, data);
      return response;
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

      state.liabilities[index] = payload;
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
        state.liabilities[state.liabilities.length - 1].id = action.payload;
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
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.status = "succeed";
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.status = "failed";
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
