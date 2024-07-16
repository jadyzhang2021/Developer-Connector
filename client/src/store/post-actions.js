import { postActions } from "./post-slice";

export const addPost = ({ text }) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData.errors));
      }
      await response.json();
      dispatch(getPosts());
    } catch (error) {
      const errorMsg = JSON.parse(error.message);
      console.error("Registration failed:", errorMsg);
      dispatch(postActions.registerFail(errorMsg));
    }
  };
};

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      dispatch(postActions.replaceUsersData({ usersData: data || [] }));
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const getPost = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`/api/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();

      dispatch(
        postActions.replaceUserData({
          userData: data || [],
          comments: data.comments || [],
          loading: true,
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    const deleteData = async () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    };
    try {
      await deleteData();
      dispatch(getPosts());
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const addLike = (id) => {
  return async (dispatch) => {
    const likeComment = async () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`/api/posts/like/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    };
    try {
      await likeComment();
      dispatch(getPosts());
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const removeLike = (id) => {
  return async (dispatch) => {
    const unlikeCommont = async () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`/api/posts/unlike/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json;
    };
    try {
      await unlikeCommont();
      dispatch(getPosts());
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const addComment = ({ text, postId }) => {
  return async (dispatch) => {
    const writeComment = async () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`/api/posts/comment/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData.errors));
      }
      return response.json();
    };
    try {
      await writeComment();
      dispatch(getPost(postId));
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const deleteComment = ({ postId, _id }) => {
  return async (dispatch) => {
    const removeComment = async () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`/api/posts/comment/${postId}/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("some thing wrong");
      }
      return response.json();
    };
    try {
      await removeComment();
      dispatch(getPost(postId));
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
};
