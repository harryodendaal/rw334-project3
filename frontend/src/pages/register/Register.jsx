import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "./register.module.css";
import axiosInstance from "../../api/axios";
import { useHistory } from "react-router-dom";

const regValidation = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string(),
  email: Yup.string(),
  // .required("Password is required")
  // .min(12, "password needs to be atleast 12 characters long"),
  passwordConfirmation: Yup.string(),
  //   .required("Password is required")
  //   .min(12, "password needs to be atleast 12 characters long"),
});

export const Register = ({ changeToken }) => {
  const history = useHistory();
  return (
    <div className={styled.container}>
      <div className={styled.border}>
        <h2>Register</h2>
        <Formik
          validationSchema={regValidation}
          initialValues={{
            username: "",
            password: "",
            passwordConfirmation: "",
            email: "",
          }}
          onSubmit={(values) => {
            if (values.password === values.passwordConfirmation) {
              axiosInstance
                .post("register/", {
                  username: values.username,
                  password: values.password,
                  email: values.email,
                })
                .then((res) => {
                  history.push("/login");
                  changeToken();
                  console.log(res);
                  console.log(res.data);
                })
                .catch((e) => {
                  console.log(e);
                  alert(e);
                  // alert(e.response.data["message"]);
                });
            } else {
              alert("passwords do not match");
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
            <form onSubmit={handleSubmit}>
              <p>Username:</p>
              <input
                className={styled.input}
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {values.username && touched.username && errors.username}
              <p>Email:</p>
              <input
                className={styled.input}
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <br></br>
              {errors.email && touched.email}
              <p>Password:</p>
              <input
                className={styled.input}
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <br></br>
              {errors.password && touched.password && errors.password}
              <p>Password Confirmation:</p>
              <input
                className={styled.input}
                type="password"
                name="passwordConfirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirmation}
              />
              <br></br>
              {errors.passwordConfirmation && touched.passwordConfirmation}

              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
