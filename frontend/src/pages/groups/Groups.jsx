import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { FetchGroups } from "../../api/api";
import styled from "./groups.module.css";
import img from "./img/group_icon.png";

export const Groups = () => {
  const { data } = useQuery("FetchGroups", FetchGroups);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <div className={styled.container}>
        <img className={styled.img} src={img} alt="create" />
        <button className={styled.button}>
          <Link to="groupForm"> Create Group</Link>
        </button>
        {/* <FetchPosts /> */}
        <div>
          <h2 className={styled.heading}>Your Groups</h2>
          <ul>
            {data?.map((group) => (
              <>
                <li key={group.id}>
                  <Link to={`/group/${group.id}`}>{group.name}</Link>
                </li>
                <h2></h2> {/* this lists them underneath each other, Do not remove */}
              </>
            ))}
          </ul>
        </div>{" "}
      </div>
    </>
  );
};
