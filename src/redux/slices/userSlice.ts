import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENV } from "@/config/env";
import { IBankendError, IStore } from "@/utils/types";
import axiosInstance from "@/lib/axiosInstance";

export const getFiles = createAsyncThunk(
  "u/get-files",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `${ENV.BACKEND_URL}/profile/get-files`
      );
      return data.data.files;
    } catch (error) {
      const err = error as IBankendError;
      return rejectWithValue(
        err.response?.data || "An error occurred while fetching files."
      );
    }
  }
);

export const getWallet = createAsyncThunk(
  "u/get-wallet",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `${ENV.BACKEND_URL}/wallet/get-wallet`
      );
      return data.data.wallet;
    } catch (error) {
      const err = error as IBankendError;
      return rejectWithValue(
        err.response?.data || "An error occurred while fetching files."
      );
    }
  }
);

export const getTransactions = createAsyncThunk(
  "u/get-transactions",
  async (values: { index: number; length: number }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `${ENV.BACKEND_URL}/wallet/get-transactions`,
        values
      );
      return data.data.transactions;
    } catch (error) {
      const err = error as IBankendError;
      return rejectWithValue(
        err.response?.data || "An error occurred while fetching files."
      );
    }
  }
);

export const getUserStore = createAsyncThunk(
  "admin/get-user-store",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `${ENV.BACKEND_URL}/admin/get-user-store`,
        {
          userId,
        }
      );
      return data.data.store;
    } catch (error) {
      const err = error as IBankendError;
      return rejectWithValue(
        err.response?.data || "An error occurred while fetching files."
      );
    }
  }
);

export const getBanks = createAsyncThunk(
  "u/get-banks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `${ENV.BACKEND_URL}/bank/get-banks`
      );
      return data.data.banks;
    } catch (error) {
      const err = error as IBankendError;
      return rejectWithValue(
        err.response?.data || "An error occurred while fetching files."
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    files: [],
    wallet: null,
    transactions: [],
    banks: [],
    loading: false,
    userStore: null as IStore | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBanks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.files = action.payload;
        state.loading = false;
      })
      .addCase(getUserStore.fulfilled, (state, action) => {
        state.userStore = action.payload;
        state.loading = false;
      })
      .addCase(getWallet.fulfilled, (state, action) => {
        state.wallet = action.payload;
        state.loading = false;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(getBanks.fulfilled, (state, action) => {
        state.banks = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
