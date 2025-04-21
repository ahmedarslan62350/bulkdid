import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENV } from "@/config/env";
import { IBankendError } from "@/utils/types";
import axiosInstance from "@/lib/axiosInstance";

export const getUsersAnalytics = createAsyncThunk(
  "admin/get-users-analytics",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `${ENV.BACKEND_URL}/analytics/users`
      );
      return data.data.analytics;
    } catch (error) {
      const err = error as IBankendError;
      return rejectWithValue(
        err.response?.data || "An error occurred while fetching files."
      );
    }
  }
);

export const getLogsAnalytics = createAsyncThunk(
  "admin/get-logs-analytics",
  async (_, { rejectWithValue }) => {
    try {
      const { data: infoRes } = await axiosInstance.post(
        `${ENV.BACKEND_URL}/analytics/logs/info`
      );
      const { data: errorRes } = await axiosInstance.post(
        `${ENV.BACKEND_URL}/analytics/logs/error`
      );

      const infoLogs = infoRes.data.logs as [];
      const errorLogs = errorRes.data.logs as [];

      return [...infoLogs, ...errorLogs];
    } catch (error) {
      const err = error as IBankendError;
      return rejectWithValue(
        err.response?.data || "An error occurred while fetching files."
      );
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    usersAnalytics: null,
    loading: false,
    logs: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersAnalytics.fulfilled, (state, action) => {
      state.usersAnalytics = action.payload;
      state.loading = false;
    });
    builder
      .addCase(getLogsAnalytics.fulfilled, (state, action) => {
        state.logs = action.payload;
        state.loading = false;
      })
      .addCase(getUsersAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLogsAnalytics.pending, (state) => {
        state.loading = true;
      });
  },
});

export default analyticsSlice.reducer;
