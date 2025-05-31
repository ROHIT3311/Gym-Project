import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const fetchCoachName = createAsyncThunk(
  "/coachesName",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/coachesName`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "something went wrong"
      );
    }
  }
);
const coachSlice = createSlice({
  name: "coaches",
  initialState: {
    loading: false,
    specialization: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoachName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoachName.fulfilled, (state, action) => {
        state.loading = false;
        state.coaches = action.payload.coaches;
      })
      .addCase(fetchCoachName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default coachSlice.reducer;
