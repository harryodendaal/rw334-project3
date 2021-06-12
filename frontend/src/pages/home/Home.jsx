import { FetchPosts } from "../../api/api";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import styles from "./home.module.css";
export const Home = () => {
  const { data } = useQuery("FetchPosts", FetchPosts);

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.unorderedList}>
          {data?.map((post) => (
            <>
              <div className={styles.singleBox}>
                <h1>Created by:</h1>
                <li key={post.id} className={styles.listitem}>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </li>
              </div>
              <br></br>
            </>
          ))}
        </ul>
      </div>
    </>
  );
};
