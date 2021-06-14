import React from "react";
import { Link } from "react-router-dom";
import { GetUserId } from "../../helper/getUserId";
import search from "./img/search.png";
import { useState } from "react";
// import axiosInstance from "../../api/axios";
import styled from "./navbar.module.css";

const AuthenticatedLinks = ({ changeToken }) => {

  const [searchUsers, setSearchUsers] = useState("");
  const [searchGroups, setSearchGroups] = useState("");

  const handleClick = () => {
    // axiosInstance
    //   .post("logout")
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    changeToken();

    console.log("hello");
  };
  return (
    <div className={styled.container}>
      <ul class={styled.ul}>
        <li>
          <Link to={`/user/${GetUserId()}`}> {localStorage.getItem("username")}
          </Link>
        </li>
        <li>
          <Link to="/feed">Posts Feed</Link>
        </li>
        <li>
          <Link to="/groups">Group Feed</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        <li>
          <a href="/" onClick={handleClick}>
            Logout
          </a>
        </li>
      </ul>

      <div className="search-container">
        <form action="search">
          <button class={styled.searchButton}>
            <img src={search} width="10" height="10" alt="search" />
            <p class={styled.box}>Search</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export const Navbar = ({ token, changeToken }) => {
  return (
    <div className={styled.container}>
      <nav>
        {token === true ? (
          <AuthenticatedLinks changeToken={changeToken} />
        ) : (
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};
