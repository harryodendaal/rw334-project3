import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "./register.module.css";
import axiosInstance from "../../api/axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import rutger from "./img/Rutger.jpeg";
import harry from "./img/Harry.jpg";
import bernard from "./img/Bernard.jpeg";
import anna from "./img/Anna.jpg";
import jacq from "./img/jacq.jpeg";
import kaylan from "./img/kaylan.jpeg";

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
  const [currentName, updateName] = useState(rutger);
  const [avatarName, updateAvatar] = useState("rutger");

  return (
    <div className={styled.container}>
      <div className={styled.border}>
        <h2 className={styled.heading}>Register</h2>
        <Formik
          validationSchema={regValidation}
          initialValues={{
            username: "",
            password: "",
            passwordConfirmation: "",
            email: "",
            photo1: "",
          }}
          onSubmit={(values) => {
            let data = new FormData();
            data.append("photo1", values.photo1);

            console.log(data);
            if (values.password === values.passwordConfirmation) {
              axiosInstance
                .post("register/", {
                  username: values.username,
                  password: values.password,
                  email: values.email,
                  avatar: data,
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
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <p className={styled.text}>Username:</p>
              <input
                className={styled.input}
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {values.username && touched.username && errors.username}
              <p className={styled.text}>Email:</p>
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
              <p className={styled.text}>Password:</p>
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
              <p className={styled.text}>Password Confirmation:</p>
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

              <input
                type="file"
                name="photo1"
                onChange={(event) =>
                  setFieldValue("photo1", event.target.files[0])
                }
              />

              <div className={styled.choose}>
                <p>Chosen avatar: {avatarName}</p>
                <img
                  className={styled.chosenImg}
                  src={currentName}
                  alt="member"
                />
              </div>

              <div>
                <p className={styled.choose}>Change your avatar:</p>

                <p>Chosen avatar: {avatarName}</p>
                <img className={styled.img} src={currentName} alt="member" />
              </div>

              <div>
                <p>Change your avatar:</p>
                <div>
                  <img className={styled.img} src={harry} alt="member" />
                  <img className={styled.img} src={rutger} alt="member" />
                  <img className={styled.img} src={bernard} alt="member" />
                  <img className={styled.img} src={kaylan} alt="member" />
                  <img className={styled.img} src={jacq} alt="member" />
                  <img className={styled.img} src={anna} alt="member" />
                </div>
                <div>
                  <button
                    className={styled.buttonW}
                    onClick={() => {
                      updateName(harry);
                      updateAvatar("Harry");
                    }}
                  ></button>
                  <button
                    className={styled.buttonW}
                    onClick={() => {
                      updateName(rutger);
                      updateAvatar("Rutger");
                    }}
                  ></button>
                  <button
                    className={styled.buttonW}
                    onClick={() => {
                      updateName(bernard);
                      updateAvatar("Bernard");
                    }}
                  ></button>
                  <button
                    className={styled.buttonW}
                    onClick={() => {
                      updateName(kaylan);
                      updateAvatar("Kaylan");
                    }}
                  ></button>
                  <button
                    className={styled.buttonW}
                    onClick={() => {
                      updateName(jacq);
                      updateAvatar("Jacques");
                    }}
                  ></button>
                  <button
                    className={styled.buttonW}
                    onClick={() => {
                      updateName(anna);
                      updateAvatar("Anna");
                    }}
                  ></button>
                </div>
              </div>

              <button className={styled.button} type="submit">
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
