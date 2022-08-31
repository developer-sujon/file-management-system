//External import
import { configureStore } from "@reduxjs/toolkit";

//Internal Import
import settingSlice from "../slices/settingSlice";

const store = configureStore({
  reducer: {
    setting: settingSlice,
  },
});

export default store;
