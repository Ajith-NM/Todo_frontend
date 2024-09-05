import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
};

export const LoadingSlice = createSlice({
  name: "Loader",
  initialState,
  reducers: {
    addLoader: (state) => {
      state.loader = true;
    },
    removeLoader: (state) => {
      state.loader = false;
    },
  },
});

export const { addLoader, removeLoader } = LoadingSlice.actions;

export default LoadingSlice.reducer;
