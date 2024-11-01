import { configureStore } from "@reduxjs/toolkit";
import VisitorReducer from "./features/visitors/visitorSlice";

const store = configureStore({
  reducer: {
    visitors: VisitorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
