import React, { useEffect, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";

import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education.js";
import DashboardPopup from "./DashboardPopup";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../store/profile-actions";

const Dashboard = () => {
  const location = useLocation();
  const userName = location.state?.name;

  const deleting = useSelector((state) => state.profileData.delete);
  const user = useSelector((state) => state.profileData.profile.user);
  const education = useSelector((state) => state.profileData.education);

  const experience = useSelector((state) => state.profileData.experience);
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
    setShowPopup(false);
  };

  if (deleting) {
    return <Navigate to="/" />;
  }
  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {(user && user.name) || userName}
      </p>
      {userName ? (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      ) : (
        <>
          <DashboardActions />
          <Experience experience={experience} />
          <Education education={education} />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => setShowPopup(true)}
            >
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </>
      )}
      {showPopup && (
        <DashboardPopup
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </section>
  );
};

export default Dashboard;
