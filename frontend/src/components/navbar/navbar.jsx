import React from "react";
import { Link } from "react-router-dom";
// import axiosInstance from "../../api/axios";
import styled from "./navbar.module.css";

// const AuthenticatedLinks = () => {
//   const handleClick = () => {
//     axiosInstance
//       .post("logout")
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//     changeToken();
//     localStorage.removeItem("token");
//     console.log("hello");
//   };

//   return (
//     <ul>
//       <li>
//         <Link to="">Home</Link>
//       </li>
//       <li>
//         <a href="/" onClick={handleClick}>
//           Logout
//         </a>
//       </li>
//     </ul>
//   );
// };

export const Navbar = () => {
  return (
    <div className={styled.container}>
      <nav>
        {/* {token === true ? (
          <AuthenticatedLinks changeToken={changeToken} />
        ) : ( */}
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        {/* )} */}
      </nav>
    </div>
  );
};
