import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./Actions/TaskSlice";
import LoadingSlice from "./Actions/LoadingSlice";
export const store = configureStore({
  reducer: {
    newTask: taskReducer,
    loader: LoadingSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
