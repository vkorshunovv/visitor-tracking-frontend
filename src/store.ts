import { configureStore } from "@reduxjs/toolkit";
import VisitorReducer from "./features/VisitorSlice";

const store = configureStore({
  reducer: {
    visitor: VisitorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
