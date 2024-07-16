import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { useDispatch } from "react-redux";

import { getProfileById } from "../../store/profile-actions";

const ProfileItem = (props) => {
  const { user, location, company, skills, status } = props.profile;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileById(user._id));
  }, [dispatch, user._id]);

  return (
    <div className="profile bg-light">
      <img src={user.avatar} alt="" className="round-img" />
      <div>
        <h2>{user.name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${user._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="item-centre text-primary">
            <IoMdCheckmark className="icon" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
