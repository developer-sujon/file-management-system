//external import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Internal Imports
import { getRequest } from "../../RestApi/RestClient";

//profile action
export const selectUserAction = createAsyncThunk(
  "/user/selectUser",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await getRequest("/user/selectUser");
      return data?.[0];
    } catch (e) {
      rejectWithValue(e?.response?.data);
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(selectUserAction.pending, (state, action) => {
      state.loading = true;
      state.user = undefined;
      state.serverError = undefined;
      state.appError = undefined;
    });
    builder.addCase(selectUserAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.user = action.payload;
      state.serverError = undefined;
      state.appError = undefined;
    });
    builder.addCase(selectUserAction.rejected, (state, action) => {
      state.loading = undefined;
      state.user = undefined;
      state.serverError = action.error.message;
      state.appError = action.payload.message;
    });
  },
});

export default profileSlice.reducer;
