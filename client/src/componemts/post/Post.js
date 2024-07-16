import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import { useSelector } from "react-redux";

const Post = () => {
  const post = useSelector((state) => state.post.userData);
  const loading = useSelector((state) => state.post.loading);
  const comments = useSelector((state) => state.post.comments);

  return !loading ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postId={post._id}
            date={post.date}
          />
        ))}
      </div>
    </section>
  );
};

export default Post;
