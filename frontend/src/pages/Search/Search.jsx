import { useQuery } from "react-query";
import { FetchGroups, FetchUsers } from "../../api/api";
import { Link } from "react-router-dom";
import styled from "./search.module.css";
import { useEffect, useState } from "react";
import { GetUserId } from "../../helper/getUserId";

export const Search = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchUsers, setSearchUsers] = useState("");
  const [searchGroups, setSearchGroups] = useState("");

  const res = useQuery("FetchGroups", FetchGroups);
  const res2 = useQuery("FetchUsers", FetchUsers);

  useEffect(() => {
    setUsers(res2.data);
    setGroups(res.data);
  }, [res, res2]);

  useEffect(() => {
    if (!res2.isLoading) {
      if (users.length !== 0) {
        setFilteredUsers(
          users.filter((e) =>
            e.username.toLowerCase().includes(searchUsers.toLowerCase())
          )
        );
      }
    }
  }, [searchUsers, users]);
  useEffect(() => {
    if (!res.isLoading) {
      if (groups.length !== 0) {
        setFilteredGroups(
          groups.filter((e) =>
            e.name.toLowerCase().includes(searchGroups.toLowerCase())
          )
        );
      }
    }
  }, [searchGroups, groups]);

  return (
    <>
      <div>
        <h1 className={styled.h1}>Search</h1>
        <div className={styled.search}>
          <p className={styled.p}>Users: <input
            className={styled.box}
            type="text"
            placeholder="Search Users"
            onChange={(e) => setSearchUsers(e.target.value)}
          /> </p>
          <p>Groups: <input
            className={styled.box}
            type="text"
            placeholder="Search Groups"
            onChange={(e) => setSearchGroups(e.target.value)}
          /> </p>
          
        </div>
      </div>
      <div className={styled.gridContainer}>
        <div className={styled.grid_item1}>
          <h1 >Groups: </h1>
          <ul>
            {filteredGroups?.map((group) => (
              <>
                <li key={group.id}>
                  <Link to={`/group/${group.id}`}>{group.name}</Link>
                </li>
                <h2></h2>
              </>
            ))}
          </ul>
        </div>
        <div className={styled.grid_item2}>
          <h1>Users: </h1>
          {filteredUsers?.map((user) => (
            <>
              <li>
                <Link to={`/user/${user.id}/${GetUserId()}`}>
                  {user.username}
                </Link>
              </li>
              <h2></h2>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
