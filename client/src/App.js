import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchProfileData } from "./store/profile-actions";
import { getUser } from "./store/user-actions";
import userSlice from "./store/user-slice";

import Landing from "./componemts/layout/Landing";
import Register from "./componemts/auth/Register";
import Login from "./componemts/auth/Login";
import RootLayout from "./rootLayout/Root";
import Profiles from "./componemts/profiles/Profiles";
import Profile from "./componemts/profile/Profile";
import Dashboard from "./componemts/dashboard/Dashboard";

import PrivateRoute from "./componemts/routing/PrivateRoute";
import ProfileForm from "./componemts/profile-forms/ProfileForm";
import AddExperience from "./componemts/profile-forms/AddExperience";
import AddEducation from "./componemts/profile-forms/AddEducation";
import Posts from "./componemts/posts/Posts";
import Post from "./componemts/post/Post";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      dispatch(
        userSlice.actions.replaceIsAuthenticated({
          isAuthenticated: true,
        })
      );
      dispatch(getUser());
    }
    dispatch(fetchProfileData());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, path: "/", element: <Landing /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/profiles", element: <Profiles /> },
        { path: "/profile/:id", element: <Profile /> },
        {
          path: "dashboard",
          element: <PrivateRoute component={Dashboard} />,
        },
        {
          path: "create-profile",
          element: <PrivateRoute component={ProfileForm} />,
        },
        {
          path: "edit-profile",
          element: <PrivateRoute component={ProfileForm} />,
        },
        {
          path: "add-experience",
          element: <PrivateRoute component={AddExperience} />,
        },
        {
          path: "add-education",
          element: <PrivateRoute component={AddEducation} />,
        },
        { path: "posts", element: <PrivateRoute component={Posts} /> },
        { path: "posts/:id", element: <PrivateRoute component={Post} /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
