import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../../store/user-actions";

const Register = () => {
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.userData.signUpErrors);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password1: "",
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state.userData.auth.isAuthenticated
  );

  const { name, email, password, password1 } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === password1) {
      dispatch(userRegister({ name, email, password }));
    } else {
      setErrorMessage(true);
      const timer = setTimeout(() => {
        setErrorMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { state: { name } });
    }
    if (errorMsg && password === password1) {
      setShowErrorMessage(true);
      const timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate, name, errorMsg, password, password1]);

  return (
    <div>
      <section className="container">
        {showErrorMessage ? (
          <div className="alert alert-danger"> {errorMsg} </div>
        ) : null}
        {errorMessage ? (
          <div className="alert alert-danger"> Password not Match </div>
        ) : null}
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form
          className="form"
          action="create-profile.html"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              minLength="5"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password1"
              minLength="6"
              value={password1}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
