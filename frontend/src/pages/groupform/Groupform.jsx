import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

import styled from "./groupfrom.module.css";
import { GetUserId } from "../../helper/getUserId";

const groupFormValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export const GroupForm = () => {
  let { groupid } = useParams();
  const [updateForm, setUpdateForm] = useState(false);
  const user_id = GetUserId();

  useEffect(() => {
    if (groupid !== undefined) {
      console.log("hello");
      setUpdateForm(true);
    }
  }, [groupid]);
  const history = useHistory();
  return (
    <div className={styled.container}>
      <div className={styled.border}>
        <h2 className={styled.h2}>
          {updateForm ? (
            <h2 className={styled.h2}>Update Group</h2>
          ) : (
            <h2 className={styled.h2}>Create Group</h2>
          )}
        </h2>
        <Formik
          validationSchema={groupFormValidation}
          initialValues={{ name: "" }}
          onSubmit={(values) => {
            if (updateForm) {
              axiosInstance
                .put(`groups/${groupid}/`, {
                  name: values.name,
                })
                .then((res) => {
                  history.push(`/group/${groupid}`);
                })
                .catch((e) => {
                  console.log(e);
                  alert("check console.log");
                });
            } else {
              axiosInstance
                .post("groups/", {
                  name: values.name,
                  users: [user_id],
                })
                .then((res) => {
                  history.push(`/group/${res.data.id}`);
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
            <form onSubmit={handleSubmit}>
              <b className={styled.b}>Name:</b>
              <input
                className={styled.input}
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <br></br>
              {values.name && touched.name && errors.name}

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
