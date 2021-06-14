import { useQuery } from "react-query";
import { FetchGroups, FetchUsers } from "../../api/api";
import styled from "./search.module.css";
export const Search = () => {
  const { userData } = useQuery("FetchUsers", FetchUsers);
  const { groupData } = useQuery("FetchGroups", FetchGroups);

  return (
    <>
      <h1>Search</h1>
      <div className={styled.gridContainer}>
        <div className={styled.grid_item1}>
          <h1>Users: </h1>
          {userData?.map((user) => (
            <>
              <li>
                <link>{user.username}</link>
              </li>
            </>
          ))}
        </div>
        <div className={styled.grid_item2}>
          <h1>Groups: </h1>
        </div>
      </div>
    </>
  );
};
