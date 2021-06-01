import { useState } from "react";
import { useParams } from "react-router";
import { FetchPost, FetchComments } from "../../api/api";
import axiosInstance from "../../api/axios";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { CommentForm } from "../../components";

export const Post = () => {
  const { data } = useQuery("FetchComments", FetchComments);
  const [updateComment, setUpdateComment] = useState(false);
  const [commentInfo, setCommentInfo] = useState([]);

  let { id } = useParams();
  const history = useHistory();

  const handleDeletePostClick = () => {
    axiosInstance
      .delete(`posts/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    history.push("/");
  };

  const handleUpdatePostClick = () => {
    history.push(`/postForm/${id}`);
  };
  const handleDeleteCommentClick = (commentId) => {
    axiosInstance
      .delete(`comments/${commentId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateCommentClick = (commentId, content) => {
    // console.log(commentId);
    setUpdateComment(true);
    setCommentInfo([{ id: commentId, content: content }]);
  };
  const createComment = () => {
    setUpdateComment(false);
    setCommentInfo([]);
  };
  return (
    <>
      <div>
        <FetchPost id={id} />

        <button onClick={handleUpdatePostClick}>Update</button>
        <button onClick={handleDeletePostClick}>Delete</button>
        <h1>Comments</h1>
        <button onClick={() => createComment()}>Create New Comment</button>
        <ul>
          {data?.map((comment) => (
            <>
              <li key={comment.id}>
                {comment.content}
                <button
                  onClick={() =>
                    handleUpdateCommentClick(comment.id, comment.content)
                  }
                >
                  Update
                </button>
                <button onClick={() => handleDeleteCommentClick(comment.id)}>
                  Delete
                </button>

                {/* <Link to={`/post/${post.id}`}>{post.title}</Link> */}
              </li>

              <br></br>
            </>
          ))}
          {updateComment && (
            <CommentForm createComment={false} commentInfo={commentInfo} />
          )}
        </ul>
        {!updateComment && (
          <CommentForm createComment={true} commentInfo={commentInfo} />
        )}
        {/* <button onClick={handle}></button> */}
      </div>
    </>
  );
};
