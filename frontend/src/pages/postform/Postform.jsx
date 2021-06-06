import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

import styled from "./postform.module.css";

const postFormValidation = Yup.object().shape({
  title: Yup.string().required("Username is required"),
  category: Yup.string().required("category is required"),
  content: Yup.string().required("content is required"),
});

export const PostForm = () => {
  let { groupId, postId } = useParams();
  const [updateForm, setUpdateForm] = useState(false);
  useEffect(() => {
    if (postId !== undefined) {
      setUpdateForm(true);
    }
  }, [postId]);
  const history = useHistory();
  return (
    <div className={styled.container}>
      <div className={styled.border}>
        <h2>{updateForm ? <h1>Update Post</h1> : <h1>Create Post</h1>}</h2>
        <Formik
          validationSchema={postFormValidation}
          initialValues={{ title: "", category: "", content: "" }}
          onSubmit={(values) => {
            console.log(values);

            if (updateForm) {
              axiosInstance
                .put(`posts/${postId}/`, {
                  title: values.title,
                  category: values.category,
                  content: values.content,
                  group: groupId,
                })
                .then((res) => {
                  // localStorage.setItem("access_token", res.data.access);
                  // localStorage.setItem("refresh_token", res.data.refresh);
                  // axiosInstance.defaults.headers["Authorization"] =
                  //   "JWT " + localStorage.getItem("access_token");
                  history.push(`/group/${groupId}`);
                  // changeToken();
                })
                .catch((e) => {
                  console.log(e);
                  alert("check console.log");
                });
            } else {
              axiosInstance
                .post("posts/", {
                  title: values.title,
                  category: values.category,
                  content: values.content,
                  group: groupId,
                })
                .then((res) => {
                  // localStorage.setItem("access_token", res.data.access);
                  // localStorage.setItem("refresh_token", res.data.refresh);
                  // axiosInstance.defaults.headers["Authorization"] =
                  //   "JWT " + localStorage.getItem("access_token");
                  history.push(`/group/${groupId}`);
                  // changeToken();
                })
                .catch((e) => {
                  console.log(e);
                  alert("check console.log");
                });
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
              <b>Title:</b>
              <input
                className={styled.input}
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              {values.title && touched.title && errors.title}
              <b>Category:</b>
              <input
                className={styled.input}
                type="text"
                name="category"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
              />
              {errors.category && touched.category && errors.category}
              <b>Content:</b>
              <input
                className={styled.input}
                type="text"
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
              />
              {errors.content && touched.content && errors.content}
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
