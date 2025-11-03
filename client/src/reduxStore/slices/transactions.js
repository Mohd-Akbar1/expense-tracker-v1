
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//  Async thunk for fetching all transactions
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://expense-tracker-v1-zthq.onrender.com/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
     removeTransaction: (state, action) => {
      // remove by id
      state.transactions = state.transactions.filter(
        (tx) => tx._id !== action.payload
      );
    },
  
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTransactions,removeTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
