import { FetchGroups } from "../../api/api";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect } from "react";
export const Groups = () => {
  const { data } = useQuery("FetchGroups", FetchGroups);
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <>
      <div>
        <button>
          <Link to="groupForm"> Create Group</Link>
        </button>
        {/* <FetchPosts /> */}
        <div>
          <ul>
            {data?.map((group) => (
              <>
                <li key={group.id}>
                  <Link to={`/group/${group.id}`}>{group.name}</Link>
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
