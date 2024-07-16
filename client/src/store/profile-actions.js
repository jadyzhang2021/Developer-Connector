// import axios from "axios";
import { profileActions } from "./profile-slice";

export const fetchProfileData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("/api/profile");
      if (!response.ok) {
        throw new Error("coult not get the profile data");
      }
      const data = await response.json();

      return data;
    };
    try {
      const profileData = await fetchData();
      dispatch(
        profileActions.replaceProfiles({
          profiles: profileData || [],
        })
      );
    } catch (error) {
      console.error("catch data error");
    }
  };
};

export const getCurrentProfile = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch("/api/profile/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("can not found profile");
      }
      const data = await response.json();

      dispatch(
        profileActions.replaceCurrentProfile({
          education: data.education || [],
          experience: data.experience || [],
          skills: data.skills || [],
          user: data.user || [],
          profile: data || [],
          loading: true,
          creating: false,
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const createProfile = ({ ...formData }) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Token");

      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ ...formData }),
      });

      if (!response.ok) {
        throw new Error("create profile fail");
      }
      await response.json();
      dispatch(
        profileActions.replaceAuth({
          updating: true,
          creating: true,
          message: "Create Profile Successful",
        })
      );
      dispatch(getCurrentProfile());
    } catch (error) {
      console.error("Create profile failed:", error);
      dispatch(
        profileActions.replaceMessage({
          message: "Create/Update Profile Fail",
        })
      );
    }
  };
};

export const getProfileById = (id) => {
  return async (dispatch) => {
    const getUserProfile = async () => {
      const response = await fetch(`api/profile/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("can not found profile");
      }
      const data = await response.json();
      return data;
    };
    try {
      const profile = await getUserProfile();
      dispatch(
        profileActions.replaceProfileById({
          profileById: profile || [],
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const addExperience = ({ ...formData }) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch("/api/profile/experience", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ ...formData }),
      });

      if (!response.ok) {
        throw new Error("create experience fail");
      }
      await response.json();
      dispatch(getCurrentProfile());
      dispatch(profileActions.replacCreating({ creating: true, message: "" }));
    } catch (error) {
      console.error("Create profile failed:", error);
    }
  };
};

export const addEducation = ({ ...formData }) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch("/api/profile/education", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ ...formData }),
      });

      if (!response.ok) {
        throw new Error("create experience fail");
      }
      await response.json();
      dispatch(getCurrentProfile());
      dispatch(profileActions.replacCreating({ creating: true, message: "" }));
    } catch (error) {
      console.error("Error while creating profile:", error);
      throw error; // 继续抛出错误，以便外部调用者处理
    }
  };
};

export const deleteEducation = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`api/profile/education/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("create experience fail");
      }
      await response.json();
      dispatch(getCurrentProfile());
    } catch (error) {
      console.error("Create profile failed:", error);
    }
  };
};

export const deleteExperience = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`api/profile/experience/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("delete experience fail");
      }
      await response.json();
      dispatch(getCurrentProfile());
    } catch (error) {
      console.error("delete profile failed:", error);
    }
  };
};

export const deleteAccount = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch("api/profile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("delete experience fail");
      }
      await response.json();
      dispatch(getCurrentProfile());
      dispatch(
        profileActions.replaceDelete({
          delete: true,
        })
      );
    } catch (error) {
      console.error("delete profile failed:", error);
    }
  };
};

export const logout = () => (dispatch) => {
  dispatch(profileActions.logout());
};
