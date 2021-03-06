import React, { useEffect, useState, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from 'react-redux'
import { Map } from "./Map.jsx";

import styled from "./postform.module.css";

const postFormValidation = Yup.object().shape({
  title: Yup.string().required("Username is required"),
  category: Yup.string().required("category is required"),
  content: Yup.string().required("content is required"),
});

export const PostForm = () => {
  let { groupId, postId } = useParams();
  const [updateForm, setUpdateForm] = useState(false);
  const [locationSelect, setLocationSelect] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const [location, setLocation] = useState(null);
  const refSelect = useRef(null);
  const positionlng = useSelector((state) => state.counter.lng);
  const positionlat = useSelector((state) => state.counter.lat);

  const handleLocationSelectChange = (e) => {
    setLocationSelect(e.target.value);
  }

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.selectedOptions[0].value);
  }

  useEffect(() => {
    if (postId !== undefined) {
      setUpdateForm(true);
    }
  }, [postId]);

  useEffect(() => {
    // Get groups of user...
    axiosInstance
    .get('users/', {
      params: {
        username: localStorage.getItem("username")
      }
      
    })
    .then((res) => {
      setGroups(res.data[0].api_groups);
    })
    .catch((e) => {
      console.log(e);
      alert("check console.log");
    });

  }, []);

  const history = useHistory();

  return (
    <>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
    <div className={styled.split}>
      <div className={styled.make}>
        <h2 className={styled.h2}>
          {updateForm ? (
            <h2 className={styled.h2}>Update Post</h2>
          ) : (
            <h2 className={styled.h2}>Create Post</h2>
          )}
        </h2>
        <Formik
          validationSchema={postFormValidation}
          initialValues={{ title: "", category: "", content: "" }}
          onSubmit={(values) => {
            // values.group = groupName;
            values.group = refSelect.current.selectedOptions[0].value;
            console.log(values);
            if (updateForm) {
              axiosInstance
                .put(`posts/${postId}/`, {
                  title: values.title,
                  category: values.category,
                  location: "POINT(" + positionlat + " " + positionlng + ")",
                  content: values.content,
                })
                .then((res) => {
                  history.push(`/group/${groupId}`);
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
                  location: "POINT(" + positionlat + " " + positionlng + ")",
                  content: values.content,
                  group: values.group,
                })
                .then((res) => {
                  // localStorage.setItem("access_token", res.data.access);
                  // localStorage.setItem("refresh_token", res.data.refresh);
                  // axiosInstance.defaults.headers["Authorization"] =
                  //   "JWT " + localStorage.getItem("access_token");
                  history.push(`/feed`);
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

              <input type="radio" id="current-location" name="location" value="current-location" onChange={handleLocationSelectChange}/>
              <label for="current-location">Use current location</label><br/>
              <input type="radio" id="custom-location" name="location" value="custom-location" onChange={handleLocationSelectChange}/>
              <label for="custom-location">Select location on map</label><br/>
              <Map locationSelect={locationSelect} location={location}/>
              
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
              <b className={styled.b}>Group:</b>

              <select name="group-names" id="group-names" ref={refSelect} onChange={handleGroupNameChange}>
                  {groups?.map((group) => (
                    <>
                      <option value={group.name}>{group.name}</option>
                    </>
                  ))}
              </select>
              <button class={styled.button} type="submit">
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );
};
