import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(
    (state) => state.userData.auth.isAuthenticated
  );
  if (isAuthenticated) return <Component {...rest} />;

  return <Navigate to="/login" />;
};

export default PrivateRoute;
