import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axios";
import { useHistory } from "react-router-dom";

import styled from "./login.module.css";

const loginValidation = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string(),
  // .required("Password is required")
  // .min(12, "password needs to be atleast 12 characters long"),
});

export const Login = ({ changeToken }) => {
  const history = useHistory();
  return (
    <div className={styled.container}>
      <div className={styled.border}>
        <h2>Login</h2>
        <Formik
          validationSchema={loginValidation}
          initialValues={{ username: "", password: "", checked: [] }}
          onSubmit={(values) => {
            axiosInstance
              .post("token", {
                username: values.username,
                password: values.password,
              })
              .then((res) => {
                localStorage.setItem("access_token", res.data.access);
                if (values.checked[0] === "remember") {
                  localStorage.setItem("refresh_token", res.data.refresh);
                }
                localStorage.setItem("username", values.username);
                axiosInstance.defaults.headers["Authorization"] =
                  "JWT " + localStorage.getItem("access_token");
                history.push("/");
                changeToken();
              })
              .catch((e) => {
                console.log(e);
                alert(e);
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit} className={styled.container}>
              <b>Username:</b>
              <input
                className={styled.input}
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {values.username && touched.username && errors.username}
              <b>Password:</b>
              <input
                className={styled.input}
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit">Submit</button>
              <label>
                <Field type="checkbox" name="checked" value="remember" />
                remember me
              </label>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
