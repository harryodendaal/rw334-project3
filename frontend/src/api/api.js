import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GetUserId } from '../helper/getUserId';
import axiosInstance from './axios';

export const  FetchPosts = async () => {
    const response = await axiosInstance.get('posts/')
    if(response.status !== 200) {
        throw new Error("something went wrong")
    
    }
    console.log(response.data)
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
export const FetchUsers = async () => {
    const response = await axiosInstance.get('users/')
    if(response.status!==200){
        throw new Error("Something went wrong")
    }
    return response.data
}
export const FetchUser = ({id}) => {
    const [user, setUser] = useState({})
    const [isFriend, setIsFriend] = useState(false)
    var user_id = GetUserId()
    useEffect(() => {
        axiosInstance.get(`users/${id}`)
            .then(res=> {
                console.log(res)
                setUser(res.data)
            })
            .catch(err=> {
                console.log(err)
            })
    }, [id])
    useEffect(() => {
        if(user?.friends?.includes(user_id)){
            setIsFriend(true)
            console.log('friend')
        } else {
            setIsFriend(false)
            console.log("not friends")
        }
    }, user.friends, user_id)

    const handleAddFriendClick = () => {
        axiosInstance
            .put(`users/${id}/`,{
                friends:[...user.friends, user_id]

            }).then((res)=> {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
            window.location.reload(false)

    }
    return (
        <div>
            {(!isFriend) &&
                <>
                    <button onClick={handleAddFriendClick}>Add Friend</button>
                </>
            }
            <h3>{user.username}</h3>
        </div>
    )
}
export const FetchPost = ({id, groupId}) => {
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
            <h1>
                {post.title}
                {/* <Link to={`/post/${post.id}`}>{post.title}</Link> */}
            </h1>
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
    var user_id = GetUserId()
    const [group, setGroup] = useState({})
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser, setIsUser] = useState(false)

    useEffect(() => {
        axiosInstance.get(`groups/${id}`)
            .then(res => {
                console.log(res.data)
                setGroup(res.data)
            })
            .catch(err=> {
                console.log(err)
            })
    },[id])

    useEffect(() => {
        //check if admin
        if(group?.admins?.includes(user_id)){
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
        //check if user
        if(group?.users?.includes(user_id)){
            setIsUser(true)
        } else {
            setIsUser(false)
        }

    }, [group.admins, user_id, group.users])

    const handleDeleteGroupClick = () => {
        axiosInstance
            .delete(`groups/${id}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err)=> {
                console.log(err)
            })
            window.location.reload(false)
    }

    const handleJoinGroupClick = () => {
        axiosInstance
            .put(`groups/${id}/`,{
                users:[...group.users,user_id]
            })
            .then((res)=>{
               console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
            window.location.reload(false)
    }

    return (
        <div>
            <h3>{group.name}</h3>
            {(!isUser) && <>
                <button onClick={handleJoinGroupClick}>Join Group</button>
            </>}
            {isAdmin ?
            <>
                <Link to={`/groupForm/${id}`}>
                    <button>Update</button>
                </Link>
                 <button onClick={handleDeleteGroupClick}>Delete</button>
            </> : null}      
            {isUser ? <button>
                <Link to={`/postForm/${id}`}> Create Post</Link>
            </button>:null }
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