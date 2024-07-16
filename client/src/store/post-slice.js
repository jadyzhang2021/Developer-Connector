import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    errorMessage: null,
    usersData: [],
    userData: {},
    likes: [],
    creating: "",
    comments: [],
    loading: "",
  },
  reducers: {
    registerFail(state, action) {
      state.errorMessage = action.payload.errorMessage;
    },
    replaceUsersData(state, action) {
      state.usersData = action.payload.usersData;
    },
    replaceUserData(state, action) {
      state.userData = action.payload.userData;
      state.comments = action.payload.comments;
      state.loading = action.payload.loading;
    },
    replaceLikes(state, action) {
      state.likes = action.payload.likes;
    },
    replaceCreating(state, action) {
      state.creating = action.payload.creating;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice;
