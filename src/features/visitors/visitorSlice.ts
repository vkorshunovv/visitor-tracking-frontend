import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Visitor {
  id: number;
  ip: string;
  userAgent: string;
  timestamp: string;
}

interface VisitorState {
  visitors: Visitor[];
  loading: boolean;
  error: string | null;
}

const initialState: VisitorState = {
  visitors: [],
  loading: false,
  error: null,
};

export const fetchVisitors = createAsyncThunk(
  "visitors/fetchVisitors",
  async () => {
    const response = await axios.get<Visitor[]>(
      "http://127.0.0.1:8000/api/visitors/"
    );
    return response.data;
  }
);

const visitorSlice = createSlice({
  name: "visitors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchVisitors.fulfilled,
        (state, action: PayloadAction<Visitor[]>) => {
          state.visitors = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchVisitors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch visitors";
      });
  },
});

export default visitorSlice.reducer;
