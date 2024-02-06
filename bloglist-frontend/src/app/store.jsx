import { configureStore } from "@reduxjs/toolkit";
import notiSlice from "../features/notiSlice";

export const store = configureStore({
  reducer: {
    notifications: notiSlice,
  },
});
