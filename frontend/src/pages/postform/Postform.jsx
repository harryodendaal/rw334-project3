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
  location: Yup.string().required("default location option selected"),
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
    <div className={styled.split}>
      <div className={styled.make}>
<<<<<<< HEAD
        <h2 className={styled.h2}>
          {updateForm ? (
            <h2 className={styled.h2}>Update Post</h2>
          ) : (
            <h2 className={styled.h2}>Create Post</h2>
          )}
        </h2>
=======
        <h2 className={styled.h2}>{updateForm ? <h2 className={styled.h2}>Update Post</h2> : <h2 className={styled.h2}>Create Post</h2>}</h2>
>>>>>>> d65814ce5c882e63ac6dda9fde155eff3edbc8bb
        <Formik
          validationSchema={postFormValidation}
          initialValues={{ title: "", category: "", location: "", content: "" }}
          onSubmit={(values) => {
            console.log(values);

            if (updateForm) {
              axiosInstance
                .put(`posts/${postId}/`, {
                  title: values.title,
                  category: values.category,
                  location: values.location,
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
                  location: values.location,
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
              <b className={styled.b}>Title:</b>
              <input
                className={styled.inpuT}
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              {values.title && touched.title && errors.title}
              <b className={styled.b}>Category:</b>
              <input
                className={styled.inpuT}
                type="text"
                name="category"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
              />
              {errors.category && touched.category && errors.category}
              <b className={styled.b}>Location:</b>
              <input
                className={styled.inpuT}
                type="text"
                name="location"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
              />
              {errors.location && touched.location && errors.location}
              <b className={styled.b}>Content:</b>
              <textarea
                className={styled.content}
                type="text"
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
              />
              {errors.content && touched.content && errors.content}
              <button class={styled.button} type="submit">
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
