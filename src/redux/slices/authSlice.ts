import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";
import { loginSchema } from "@/schemas/login";
import { changePasswordFormSchema } from "@/schemas/changePassword";
import { changePassowrd, login, logout } from "@/backendMethods/apiCalls";
import { IBankendError } from "@/utils/types";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: z.infer<typeof loginSchema>, { rejectWithValue }) => {
    try {
      const data = await login(credentials);
      if (data) {
        localStorage.setItem("user", JSON.stringify(data.data.user)); // ✅ Save user to localStorage
      }
      return data.data.user;
    } catch (error) {
      const err = error as IBankendError;
      console.log(err);
      return rejectWithValue(
        err.response?.data?.message || "An error occurred while logging in."
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    credentials: z.infer<typeof changePasswordFormSchema>,
    { rejectWithValue }
  ) => {
    try {
      const data = await changePassowrd(credentials);
      if (data) {
        localStorage.removeItem("user");
      }
      return data;
    } catch (error) {
      const err = error as IBankendError;
      return rejectWithValue(
        err.response?.data || "An error occurred while updating password."
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      localStorage.removeItem("user"); // ✅ Remove user from localStorage
      return null;
    } catch (error) {
      const err = error as IBankendError;
      return rejectWithValue(
        err.response?.data || "An error occurred while logging out."
      );
    }
  }
);

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
