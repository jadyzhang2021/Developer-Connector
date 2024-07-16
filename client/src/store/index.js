import { configureStore } from "@reduxjs/toolkit";

import profileSlice from "./profile-slice";
import postSlice from "./post-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: {
    profileData: profileSlice.reducer,
    post: postSlice.reducer,
    userData: userSlice.reducer,
  },
});

export default store;
