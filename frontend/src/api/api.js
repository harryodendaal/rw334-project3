import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GetUserId } from '../helper/getUserId';
import axiosInstance from './axios';

export const  FetchPosts = async () => {
    const response = await axiosInstance.get('posts/')
    if(response.status !== 200) {
        throw new Error("something went wrong")
    
    }
    return response.data
}

export const FetchComments = async () => {
    const response = await axiosInstance.get('comments/')
    if(response.status !== 200) {
        throw new Error("something went wrong")

    }

    return response.data
}
export const FetchGroups = async () => {
    const response = await axiosInstance.get('groups/')
    if(response.status!==200){
        throw new Error("Something went wrong")
    }
    return response.data
}

export const FetchPost = ({id, groupId}) => {
    console.log("fetchpostcalled")
    const history = useHistory();
    var user_id = GetUserId()
    const [post, setPost] = useState({})
    const [isUserId, setIsUserId] = useState(false)
    useEffect(() => {
        axiosInstance.get(`posts/${id}`)
            .then(res => {
                console.log(res)
                setPost(res.data)
            })
            .catch(err=> {
                console.log(err)
            })
    },[id])
    useEffect(() => {
    if(user_id === post.user){
        setIsUserId(true)
    } else {
        setIsUserId(false)
    }
    }, [user_id, post.user])
    
    const handleDeletePostClick = () => {
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


  const handleUpdatePostClick = () => {
    history.push(`/postForm/${groupId}/${id}`);
  };

    return (
        <div>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
            { isUserId ?
            <>
                <button onClick={handleUpdatePostClick}>Update</button>
                <button onClick={handleDeletePostClick}>Delete</button>
            </>
            :null}
        </div>
    )
}

export const FetchComment = ({id, postId}) => {
const history = useHistory();
    var user_id = GetUserId()
    const [comment, setComment] = useState({})
    const [isUserId, setIsUserId] = useState(false)


    useEffect(() => {
       axiosInstance.get(`comments/${id}`)
            .then(res=> {
                console.log("the comment is: ",res.data)
                setComment(res.data)
            })
            .catch(err=> {
                console.log(err)
            })
    }, [id])

    useEffect(() => {
        if(user_id===comment.user){
            setIsUserId(true)
        } else {
            setIsUserId(false)

        }
    }, [user_id, comment.user])
    const handleDeleteCommentClick = () => {
        axiosInstance
            .delete(`comments/${id}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

        window.location.reload(false);

    }
    return (
        <div>
            <h3>{comment.content}</h3>
            {isUserId ?
                <>
                <Link to={`/commentForm/${postId}/${id}`}>
                    <button>Update</button>
                </Link>
                <button onClick={handleDeleteCommentClick}>Delete</button>
                </>:null
            }
    
        </div>
    )
    
}
export const FetchGroup = ({id}) => {
    const [group, setGroup] = useState({})
    var user_id = GetUserId()
    const [isUserId, setIsUserId] = useState(false)

    useEffect(() => {
        axiosInstance.get(`groups/${id}`)
            .then(res => {
                console.log(res)
                setGroup(res.data)
            })
            .catch(err=> {
                console.log(err)
            })
    },[id])

    useEffect(() => {
        console.log(group.user)
        if(user_id===group.user){
            setIsUserId(true)
            console.log("hello")
        } else {
            console.log("not hello")
            setIsUserId(false)

        }
    }, [user_id, group.user])

    // const handleDeleteGroupClick = () => {
    //     axiosInstance
    //         .delete(`groups/${id}`)
    //         .then((res) => {
    //             console.log(res)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })

    //         window.location.reload(false)
    // }

    return (
        <div>
            <h3>{group.name}</h3>            
            {/* {isUserId ?
                <>
                    <button onClick={handleDeleteGroupClick}>Delete</button>
                </>:null
            } */}
        </div>
    )
}

export const FetchCommentsForPost = ({postId}) => {
    console.log('fetch comments')
    const [comments, setComments] = useState([])

    useEffect(()=> {
        axiosInstance.get(`posts/${postId}`)
            .then(res => {
                setComments(res.data.comments)
                console.log("post: ", res.data)
            })
            .catch(err=> {
                console.log(err)
            })
    }, [postId])

    return (
        <div>
            <ul>
            {comments?.map((commentId) => (
                <>
                    <FetchComment postId={postId} id={commentId}/>
                </>
            ))}
            </ul>
        </div>
    );
}
export const FetchPostsForGroup = ({id}) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axiosInstance.get(`groups/${id}`)
            .then(res => {
                setPosts(res.data.posts)
                console.log("the group is: " ,res.data)
            })
            .catch(err=> {
                console.log(err)
            })
    },[id])


    return (
        <div>
           {posts?.map((postId) => (
               <>
                 <FetchPost id={postId} groupId={id}/>
               </>
           ))}
        </div>
    );
}

export const  FetchChats = async () => {
    const response = await axiosInstance.get('chats/')
    if(response.status !== 200) {
        throw new Error("something went wrong")
    
    }
    return response.data
}