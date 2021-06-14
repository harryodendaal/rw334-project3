import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { FetchUser } from "../../api/api";
import axiosInstance from "../../api/axios";
import styled from "./user.module.css";

const userValidation = Yup.object().shape({
  uploadOrDelete: Yup.string().required("Need to choose Update or Delete"),
});

export const User = () => {
  let { id, friendId } = useParams();
  const [viewing, setViewing] = useState(false);
  useEffect(() => {
    if (friendId !== undefined) {
      setViewing(true);
    }
  }, [friendId]);
  const history = useHistory();
  return (
    <div className={styled.split}>
      <div className={styled.make}>
        <h2>{localStorage.getItem("username")} Profile</h2>
        {viewing && <FetchUser id={id} />}
        {!viewing && (
          <Formik
            validationSchema={userValidation}
            initialValues={{
              username: "",
              email: "",
              uploadOrDelete: "",
            }}
            onSubmit={({ uploadOrDelete, username, email }) => {
              if (uploadOrDelete === "update") {
                var updateObject = {};
                if (username) {
                  updateObject["username"] = username;
                }
                if (email) {
                  updateObject["email"] = email;
                }
                console.log(updateObject);
                axiosInstance
                  .put(`users/${id}/`, updateObject)
                  .then((res) => {
                    localStorage.setItem("username", res.data.username);
                    if (username !== "" && email !== "") {
                      alert("updated Username and email");
                    } else if (username) {
                      alert("updated Username");
                    } else if (email) {
                      alert("updated Email");
                    }
                    window.location.reload(false);
                  })
                  .catch((e) => {
                    console.log(e.message);

                    alert("That username already exists");
                  });
              } else if (uploadOrDelete === "delete") {
                axiosInstance
                  .delete(`users/${id}/`)
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((e) => {
                    console.log(e);
                    alert("check console.log");
                  });
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("username");
                history.push("/");
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className={styled.container}>
                <b>Username:</b>
                <input
                  className={styled.inpuT}
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {errors.username && touched.username && errors.username}
                <b>Email:</b>
                <input
                  className={styled.inpuT}
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
                <label className={styled.selectOption} htmlFor="email" style={{ display: "block" }}>
                  Select Operation
                </label>
                <select
                  className={styled.option}
                  name="uploadOrDelete"
                  value={values.uploadOrDelete}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" label="Select operation">
                    Select Operation
                  </option>
                  <option value="update" label="Update">
                    Update
                  </option>
                  <option value="delete" label="Delete">
                    Delete
                  </option>
                </select>
                <button className={styled.button} type="submit">
                  Submit
                </button>
              </form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};
