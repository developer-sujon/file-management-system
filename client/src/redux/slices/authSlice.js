//external import
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

//enternel lib imports
import SessionHelper from "../../helper/SessionHelper";
import { postRequest } from "../../RestApi/RestClient";

export const resetAuthAction = createAction("/auth/reset");

//registration user action
export const registrationUserAction = createAsyncThunk(
  "auth/registration",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await postRequest("/auth/registrationUser", user);
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

//login user action
export const loginUserAction = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await postRequest("/auth/loginUser", payload);
      SessionHelper.setToken(data.accessToken);
      SessionHelper.setUserDetails(data.user);
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

//logout user action
export const logoutUserAction = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      SessionHelper.removeToken();
      SessionHelper.removeUserDetails();
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: SessionHelper.getUserDetails(),
    accessToken: SessionHelper.getToken(),
  },

  //registration user reducers
  extraReducers: (builder) => {
    builder.addCase(registrationUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = false;
      state.serverError = false;
      state.registration = false;
    });

    builder.addCase(registrationUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appError = false;
      state.serverError = false;
      state.registration = true;
    });

    builder.addCase(registrationUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
      state.registration = false;
    });

    //login user reducers
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = false;
      state.serverError = false;
      state.user = undefined;
      state.accessToken = undefined;
    });

    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appError = false;
      state.serverError = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });

    builder.addCase(resetAuthAction, (state, dispatch) => {
      state.user = SessionHelper.getUserDetails();
      state.accessToken = SessionHelper.getToken();
    });

    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
      state.user = undefined;
      state.accessToken = undefined;
    });

    //user logout  reducers
    builder.addCase(logoutUserAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appError = false;
      state.serverError = false;
      state.user = undefined;
      state.accessToken = undefined;
    });

    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default authSlice.reducer;
