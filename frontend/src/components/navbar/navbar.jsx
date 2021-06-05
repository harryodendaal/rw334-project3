import React from "react";
import { Link } from "react-router-dom";
// import axiosInstance from "../../api/axios";
import styled from "./navbar.module.css";

const AuthenticatedLinks = ({ changeToken }) => {
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
    changeToken();

    console.log("hello");
  };

  return (
    <ul>
      <li>
        <Link to="">Posts Feed</Link>
      </li>
      <li>
        <a href="/" onClick={handleClick}>
          Logout
        </a>
      </li>
    </ul>
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
              <Link to="">Posts Feed</Link>
            </li>
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
