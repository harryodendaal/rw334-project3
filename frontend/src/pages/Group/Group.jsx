import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FetchGroup, FetchPostsForGroup } from "../../api/api";

export const Group = () => {
  let { id } = useParams();

  return (
    <>
      <div>
        <FetchGroup id={id} />
        <FetchPostsForGroup id={id} />
      </div>
    </>
  );
};
