import { FetchPosts } from "../../api/api";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div>
        <button>
          <Link to="postForm"> Create Post</Link>
        </button>
        <FetchPosts />
        {/* <div>{data?.map({ id, title, category, content })}</div> */}
      </div>
    </>
  );
};
