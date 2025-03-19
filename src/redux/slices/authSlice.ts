import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ENV } from "@/config/env";
import { z } from "zod";
import { loginSchema } from "@/schemas/login";
import { changePasswordFormSchema } from "@/schemas/changePassword";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: z.infer<typeof loginSchema>) => {
    const { data } = await axios.post(
      `${ENV.BACKEND_URL}/auth/login`,
      credentials,
      { withCredentials: true }
    );
    localStorage.setItem("user", JSON.stringify(data.data.user)); // ✅ Save user to localStorage
    return data.data.user;
  }
);

export const updatePassword = createAsyncThunk(
  "auth/changePassword",
  async (credentials: z.infer<typeof changePasswordFormSchema>) => {
    const { data } = await axios.post(
      `${ENV.BACKEND_URL}/auth/update-password`,
      credentials,
      { withCredentials: true }
    );
    data && localStorage.removeItem("user"); // ✅ Save user to localStorage
    return data.data;
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axios.post(
    `${ENV.BACKEND_URL}/auth/logout`,
    {},
    { withCredentials: true }
  );
  localStorage.removeItem("user"); // ✅ Remove user from localStorage
  return null;
});

const getUserFromStorage = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserFromStorage(),
    isAuthenticated: !!getUserFromStorage(),
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
