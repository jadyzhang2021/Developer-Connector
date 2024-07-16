import React from "react";
import { FaThumbsDown } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatData";
import {
  addLike,
  removeLike,
  deletePost,
  getPost,
} from "../../store/post-actions";

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
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
        {showActions && (
          <>
            <button
              onClick={() => dispatch(addLike(_id))}
              type="button"
              className="btn btn-light"
            >
              <FaThumbsUp />{" "}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => dispatch(removeLike(_id))}
              type="button"
              className="btn btn-light"
            >
              <FaThumbsDown />
            </button>
            <Link
              to={`/posts/${_id}`}
              className="btn btn-primary"
              onClick={() => dispatch(getPost(_id))}
            >
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {isAuthenticated && user === userId && (
              <button
                onClick={() => dispatch(deletePost(_id))}
                type="button"
                className="btn btn-danger"
              >
                X
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostItem;
