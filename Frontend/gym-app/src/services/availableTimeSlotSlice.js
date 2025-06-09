import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const fetchAvailableTimeSlot = createAsyncThunk(
  "/availableTimeSlots",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/availableTimeSlots`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "something went wrong"
      );
    }
  }
);

const availableTimeSlotSlice = createSlice({
  name: "availableTimeSlots",
  initialState: {
    loading: false,
    time_slot: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTimeSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableTimeSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.time_slot = action.payload.time_slot;
      })
      .addCase(fetchAvailableTimeSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default availableTimeSlotSlice.reducer;
