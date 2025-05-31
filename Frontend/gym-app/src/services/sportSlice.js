import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const fetchSportsData = createAsyncThunk(
  "/getSportName",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/getSportName`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const sportSlice = createSlice({
  name: "sportType",
  initialState: {
    loading: false,
    specialization: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSportsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSportsData.fulfilled, (state, action) => {
        state.loading = false;
        state.specialization = action.payload.specialization;
      })
      .addCase(fetchSportsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});




export default sportSlice.reducer;
