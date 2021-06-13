import { FetchPosts } from "../../api/api";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "./Feed.module.css";
import filter from "./img/filter.png";
import { Map } from "./Map.jsx";

export const Feed = () => {
  const [mapVisible, setMapVisible] = useState(false);
  const { data } = useQuery("FetchPosts", FetchPosts);
  

  const toggleMap = (e) => {
    console.log(mapVisible);
    setMapVisible(!mapVisible);
  }


  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossorigin=""
      />
      <body>
        <div class="split">
          <div class={styled.split}>

            <div class="make"> 
              <div class={styled.make}>
                <h2 className={styled.h2create}>Create Post</h2>
                <div>
                  <button class={styled.button}>
                    <Link to="/postForm"> Create Post</Link>
                  </button>
                  {/* <FetchPosts /> */}
                  <div>
                    <ul>
                    {data?.map((post) => (
                      <>
                        <li key={post.id}>
                          <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </li>
                        <br></br>
                      </>
                    ))}
                  </ul>
                  </div>{" "}
                </div>
              </div>
            </div>
            
            <div class="feed">
              <div class={styled.feed}>    
                <h2 className={styled.h2}>Posts Feed</h2>
                {mapVisible === true && 
                  <Map data={data} />
                  }
                  <div class={styled.p}>
                  
                    <button onClick={toggleMap}>Toggle map</button>
                    <form>
                        <select className={styled.dropdown} id="country" name="country">
                            <option value="desTime">Time (descending)</option>
                            <option value="ascTime">Time (ascending)</option>
                            <option value="location">Location</option>
                            <option value="catagory">Catagory</option>
                            <option value="user">User</option>
                            <option value="group">Group</option>
                        </select>
                        <button className={styled.buttoN}><img src={filter} width="10" height="10"/></button>
                    </form>
                    <p>POSTS</p>
                    <ul className={styled.unorderedList}>
                      {data?.map((post) => (
                        <>
                          <div className={styled.singleBox}>
                            <h3>
                              Created by:{post.user} From Group: {post.group}
                            </h3>
                            <h4>Created: {post.timestamp}</h4>
                            <li key={post.id} className={styled.listitem}>
                              <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </li>
                          </div>
                          <br></br>
                        </>
                      ))}
                    </ul>

                  </div>
                </div>
            </div>

          </div>
        </div>
      </body>



      {/* <div className={styled.container}> 
        <ul className={styled.unorderedList}>
          {data?.map((post) => (
            <>
              <div className={styled.singleBox}>
                <h3>
                  Created by:{post.user} From Group: {post.group}
                </h3>
                <h4>Created: {post.timestamp}</h4>
                <li key={post.id} className={styled.listitem}>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </li>
              </div>
              <br></br>
            </>
          ))}
        </ul>
          </div> */}


    </>
  );
};
