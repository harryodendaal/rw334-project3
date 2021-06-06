import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FetchGroup, FetchPostsForGroup } from "../../api/api";

export const Group = () => {
  let { id } = useParams();

  return (
    <>
      <div>
        <h1>
          {" "}
          <FetchGroup id={id} />
        </h1>
        <button>
          <Link to={`/postForm/${id}`}> Create Post</Link>
        </button>
        <FetchPostsForGroup id={id} />
      </div>
    </>
  );
};
