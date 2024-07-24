import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/slice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
 middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
      devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;