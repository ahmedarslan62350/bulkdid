import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ENV } from "@/config/env";
import {
  AppSettings,
  IBankendError,
  IStore,
  ITransaction,
  IUser,
  IWallet,
} from "@/utils/types";
import axiosInstance from "@/lib/axiosInstance";

export const getUsersByAdmin = createAsyncThunk(
  "admin/get-all-users",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `${ENV.BACKEND_URL}/admin/get-all-users`
      );
      return data.data.users;
    } catch (error) {
      const err = error as IBankendError;
      return rejectWithValue(
        err.response?.data || "An error occurred while fetching files."
      );
    }
  }
);

export const getWalletsByAdmin = createAsyncThunk(
  "admin/get-all-wallets",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `${ENV.BACKEND_URL}/admin/get-all-wallets`
      );
      return data.data.wallets;
    } catch (error) {
      const err = error as IBankendError;
      return rejectWithValue(
        err.response?.data || "An error occurred while fetching files."
      );
    }
  }
);

export const getTransactionsByAdmin = createAsyncThunk(
  "admin/get-all-transactions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `${ENV.BACKEND_URL}/admin/get-all-transactions`
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

export const getAdminSettings = createAsyncThunk(
  "admin/get-settings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `${ENV.BACKEND_URL}/admin/get-all-env-variable`
      );
      const env = data.data.variables as AppSettings;
      return env;
    } catch (error) {
      const err = error as IBankendError;
      return rejectWithValue(
        err.response?.data || "An error occurred while fetching files."
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [] as IUser[],
    wallets: [] as IWallet[],
    userStore: [] as IStore[],
    transactions: [] as ITransaction[],
    settings: null as AppSettings | null,
    loading: false,
  },
  reducers: {
    updateWalletById: (
      state,
      action: PayloadAction<{ id: string; data: Partial<IWallet> }>
    ) => {
      const index = state.wallets.findIndex((e) => e._id === action.payload.id);
      if (index !== -1) {
        state.wallets[index] = {
          ...state.wallets[index],
          ...action.payload.data,
        };
      }
    },
    updateSettings: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      if (state.settings) {
        state.settings[action.payload.key as keyof AppSettings] =
          action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersByAdmin.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getAdminSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
        state.loading = false;
      })
      .addCase(getTransactionsByAdmin.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(getUserStore.fulfilled, (state, action) => {
        state.userStore.push(action.payload);
        state.loading = false;
      })
      .addCase(getWalletsByAdmin.fulfilled, (state, action) => {
        state.wallets = action.payload;
        state.loading = false;
      })
      .addCase(getUsersByAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWalletsByAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionsByAdmin.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { updateWalletById, updateSettings } = adminSlice.actions;
export default adminSlice.reducer;
