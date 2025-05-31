import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";
// Async thunk for Registration
export const register = createAsyncThunk(
  "auth/register",
  async (FormData, { rejectedWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, FormData);
      return response.data;
    } catch (error) {
      return rejectedWithValue(
        error.response.data.message || "Registration Failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (FormData, { rejectedWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, FormData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data.message || "Login Failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAuthState: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          role: action.payload.role,
        };
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //   Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
