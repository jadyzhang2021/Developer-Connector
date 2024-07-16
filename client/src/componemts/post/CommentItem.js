import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../utils/formatData";
import { deleteComment } from "../../store/post-actions";

const CommentItem = ({
  postId,
  date,
  comment: { _id, text, name, avatar, user },
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.profileData.user._id);
  const isAuthenticated = useSelector(
    (state) => state.userData.auth.isAuthenticated
  );

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {formatDate(date)}</p>
        {isAuthenticated && user === userId && (
          <button
            onClick={() => dispatch(deleteComment({ postId, _id }))}
            type="button"
            className="btn btn-danger"
          >
            x
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
