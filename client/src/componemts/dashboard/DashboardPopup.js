import React, { useEffect } from "react";

const DashboardPopup = ({ onConfirm, onCancel }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="popup_box">
      <div className="popup_box1">
        <h2 className="large">Delete Account</h2>
        <p className="m - 1">
          Are you sure you want to delete your account? This action cannot be
          undone, and it will be go back to homepage.
        </p>
        <div className="opup_box2">
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn - white" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPopup;
