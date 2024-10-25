import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Visitor {
  ip: string;
  userAgent: string;
  timestamp: string;
}

interface VisitorState {
  visitors: Visitor[];
}

const initialState: VisitorState = {
  visitors: [],
};

const visitorSlice = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    addVisitor: (state, action: PayloadAction<Visitor>) => {
      state.visitors.push(action.payload);
    },
  },
});

export const { addVisitor } = visitorSlice.actions;
export default visitorSlice.reducer;
