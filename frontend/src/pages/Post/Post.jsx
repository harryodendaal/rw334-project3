import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FetchPost, FetchCommentsForPost } from "../../api/api";
import styled from "./post.module.css";
export const Post = () => {
  let { id } = useParams();

  return (
    <>
      <div className={styled.container}>
        <FetchPost id={id} />

        <h1>Comments</h1>
        <Link to={`/commentForm/${id}`}>
          <button>Create New Comment</button>
        </Link>

        <FetchCommentsForPost postId={id} />
      </div>
    </>
  );
};
