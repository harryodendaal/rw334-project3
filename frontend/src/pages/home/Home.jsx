import { FetchPosts } from "../../api/api";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "./home.module.css";
import { GetUserId } from "../../helper/getUserId";

export const Home = () => {
  const { data } = useQuery("FetchPosts", FetchPosts);
  GetUserId();

  return (
    <>
      <body>
        <div class="split">
          <div class={styled.split}>
            <div class="feed">
              <div class={styled.feed}>
                <h2 className={styled.h2}>Posts Feed</h2>
                <div class={styled.p}>
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
