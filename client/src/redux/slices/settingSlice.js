//external import
import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    isLoading: false,
    isError: false,
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = true;
    },
    removeLoading(state, action) {
      state.isLoading = false;
    },
    setError(state, action) {
      state.isError = true;
    },
    removeError(state, action) {
      state.isError = false;
    },
  },
});

export const { setLoading, removeLoading, setError, removeError } =
  settingSlice.actions;
export default settingSlice.reducer;
