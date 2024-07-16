import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userData",
  initialState: {
    user: [],
    repos: [],
    loginError: "",
    signUpError: "",
    auth: {
      isAuthenticated: false,
    },
  },
  reducers: {
    replaceRepos(state, action) {
      state.repos = action.payload.repos;
    },
    replaceIsAuthenticated(state, action) {
      state.auth.isAuthenticated = action.payload.isAuthenticated;
    },

    registerFail(state, action) {
      state.signUpError = action.payload.signUpError;
    },
    loginFail(state, action) {
      state.loginError = action.payload.loginError;
    },

    getUser(state, action) {
      state.user = action.payload.user;
    },

    logout(state) {
      state.auth.isAuthenticated = false;
      state.user = [];
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
