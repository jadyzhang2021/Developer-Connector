// import axios from "axios";
import { userActions } from "./user-slice";

export const getGithubRepos = (username) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`/api/profile/github/${username}`);
      if (!response.ok) {
        throw new Error("coult not get the profile data");
      }
      const data = await response.json();

      return data;
    };
    try {
      const repos = await fetchData();
      dispatch(
        userActions.replaceRepos({
          repos: repos || [],
        })
      );
    } catch (error) {
      console.error("catch data error");
    }
  };
};

export const userRegister = ({ name, password, email }) => {
  return async (dispatch) => {
    const postData = async () => {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData.errors));
      }
      const data = await response.json();
      return data.token;
    };
    try {
      const token = await postData();
      localStorage.setItem("Token", token);
      dispatch(
        userActions.replaceIsAuthenticated({
          isAuthenticated: true,
        })
      );
      dispatch(getUser());
    } catch (error) {
      const errorMsg = JSON.parse(error.message);
      const errorInfor = errorMsg[0].msg;
      dispatch(
        userActions.registerFail({
          signUpError: errorInfor || "Something Wrong",
        })
      );
    }
  };
};

export const userLogin = ({ password, email }) => {
  return async (dispatch) => {
    const login = async () => {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData.errors));
      }
      const data = await response.json();
      return data.token;
    };
    try {
      const token = await login();
      localStorage.setItem("Token", token);
      dispatch(
        userActions.replaceIsAuthenticated({
          isAuthenticated: true,
        })
      );
      dispatch(getUser());
    } catch (error) {
      const errorMsg = JSON.parse(error.message);
      const errorInfor = errorMsg[0].msg;
      dispatch(
        userActions.loginFail({
          loginError: errorInfor || "Something Wrong",
        })
      );
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Token");

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch("/api/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("User not found");
      }
      const userData = await response.json();

      dispatch(userActions.getUser({ user: userData || [] }));
    } catch (error) {
      console.error(error.message);
      dispatch(userActions.replaceIsAuthenticated({ isAuthenticated: false }));
      localStorage.removeItem("Token");
    }
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("Token");
  dispatch(userActions.logout());
};
