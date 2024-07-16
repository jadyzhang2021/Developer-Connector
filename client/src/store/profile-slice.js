import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profileData",
  initialState: {
    profiles: [],
    profile: [],
    profileById: [],
    education: [],
    experience: [],
    skills: [],
    user: [],
    auth: {
      loading: false,
      creating: false,
      updating: false,
    },
    message: "",
    delete: false,
  },
  reducers: {
    replaceProfiles(state, action) {
      state.profiles = action.payload.profiles;
    },
    replaceProfileById(state, action) {
      state.profileById = action.payload.profileById;
    },

    replaceAuth(state, action) {
      state.auth.creating = action.payload.creating;
      state.auth.updating = action.payload.updating;
      state.message = action.payload.message;
    },
    replaceMessage(state, action) {
      state.message = action.payload.message;
    },
    replaceCurrentProfile(state, action) {
      state.auth.loading = action.payload.loading;
      state.auth.creating = action.payload.creating;
      state.education = action.payload.education;
      state.experience = action.payload.experience;
      state.profile = action.payload.profile;
      state.skills = action.payload.skills;
      state.user = action.payload.user;
    },
    replaceDelete(state, action) {
      state.delete = action.payload.delete;
    },
    replacCreating(state, action) {
      state.auth.creating = action.payload.creating;
      state.message = action.payload.message;
    },

    logout(state) {
      state.profile.profile = [];
      state.auth.loading = false;
      state.auth.creating = false;
      state.auth.updating = false;
      state.message = "";
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice;
