import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FetchPost, FetchCommentsForPost } from "../../api/api";
import { FetchPosts } from "../../api/api";
import { useQuery } from "react-query";
import styled from "./post.module.css";


export const Post = () => {
  let { id } = useParams();

  const { data } = useQuery("FetchPosts", FetchPosts);

  return (
    <>
      <div className={styled.container}>
      <FetchPost id={id} />
        <br></br>
        <h1>Comments</h1>
        <Link to={`/commentForm/${id}`}>
          <button>Create New Comment</button>
        </Link>
        <p></p>
        <div>
          <FetchCommentsForPost postId={id} />
        </div>
      </div>
    </>
  );
};
