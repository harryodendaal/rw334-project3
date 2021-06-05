import { FetchPosts } from "../../api/api";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
export const Home = () => {
  const { data } = useQuery("FetchPosts", FetchPosts);

  return (
    <>
      <div>
        <button>
          <Link to="postForm"> Create Post</Link>
        </button>
        {/* <FetchPosts /> */}
        <div>
          <ul>
            {data?.map((post) => (
              <>
                <li key={post.id}>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </li>
                <br></br>
              </>
            ))}
          </ul>
        </div>{" "}
      </div>
    </>
  );
};
