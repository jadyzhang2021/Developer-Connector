import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/user-actions";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isAuthenticated = useSelector(
    (state) => state.userData.auth.isAuthenticated
  );
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const errorMsg = useSelector((state) => state.userData.loginError);

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));

    if (errorMsg) {
      setShowErrorMsg(true);
      const timer = setTimeout(() => {
        setShowErrorMsg(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div>
      <section class="container">
        {showErrorMsg && <div class="alert alert-danger">{errorMsg}</div>}
        <h1 class="large text-primary">Sign In</h1>
        <p class="lead">
          <i class="fas fa-user"></i> Sign into Your Account
        </p>
        <form
          class="form"
          action="dashboard.html"
          onSubmit={(e) => onSubmit(e)}
        >
          <div class="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <input type="submit" class="btn btn-primary" value="Login" />
        </form>
        <p class="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
