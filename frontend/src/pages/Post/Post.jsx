import { useParams } from "react-router";
import { FetchPost } from "../../api/api";
import axiosInstance from "../../api/axios";
import { useHistory } from "react-router-dom";

export const Post = () => {
  let { id } = useParams();
  const history = useHistory();

  const handleDeletClick = () => {
    axiosInstance
      .delete(`posts/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    history.push("/");
  };

  const handleUpdateClick = () => {
    history.push(`/postForm/${id}`);
  };

  return (
    <>
      <div>
        <FetchPost id={id} />

        <button onClick={handleUpdateClick}>Update</button>
        <button onClick={handleDeletClick}>Delete</button>
      </div>
    </>
  );
};
