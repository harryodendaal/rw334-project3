import { FetchPosts } from "../../api/api";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "./home.module.css";

export const Home = () => {
  const { data } = useQuery("FetchPosts", FetchPosts);

  return (
    <>
      <body>
        <div class="split">
          <div class={styled.split}>

            

            <div class="feed">
              <div class={styled.feed}>    
<<<<<<< HEAD
                <h2 className={styled.h2}>Posts Feed</h2>
=======
                <h2>Posts Feed</h2>
>>>>>>> 578a77033c96116e5b1fbe4adc5c29bb622a05d0
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
