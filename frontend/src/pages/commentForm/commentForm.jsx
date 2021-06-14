import { useEffect } from "react";
import styled from "./comment.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axios";
import { useParams } from "react-router";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const CommentFormValidation = Yup.object().shape({
  content: Yup.string().required("content is required"),
});

//postId and then commentId if updating
export const CommentForm = () => {
  const history = useHistory();
  let { postId, commentId } = useParams();

  const [creatingComment, setCreatingComment] = useState(true);
  useEffect(() => {
    if (commentId) {
      setCreatingComment(false);
    }
  }, [commentId]);

  return (
    <div className={styled.container}>
      <div className={styled.border}>
        <h2 className={styled.heading}>
          {creatingComment ? <p>Creating Comment</p> : <p>Updating Comment</p>}
        </h2>
        <Formik
          validationSchema={CommentFormValidation}
          initialValues={{ content: "" }}
          onSubmit={(values) => {
            console.log(values);
            if (creatingComment) {
              axiosInstance
                .post(`comments/`, {
                  content: values.content,
                  post: postId,
                })
                .then((res) => {
                  console.log(res);
                })
                .catch((e) => {
                  console.log(e);
                  alert("check console.log");
                });
            } else {
              axiosInstance
                .put(`comments/${commentId}/`, {
                  content: values.content,
                })
                .then((res) => {
                  console.log(res);
                })
                .catch((e) => {
                  console.log(e);
                  alert("check console.log");
                });
            }

            history.push(`/post/${postId}`);
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
              <b>Content:</b>
              <textarea
                className={styled.input}
                cols="56"
                rows="5"
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
              />
              {errors.content && touched.content && errors.content}
              <button className={styled.button} type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
