import React, {useState, useEffect} from 'react';
import axiosInstance from './axios';
import { Link } from "react-router-dom";

export const  FetchPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axiosInstance.get("posts/")
            .then(res=> {
                console.log(res)
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    return (
        <div>
            <ul>
                {posts.map(post => (
                    <>
                        <li key={post.id}> 
                            <Link to={`/post/${post.id}`}>{post.title}</Link> 
                        </li>
                        <br></br>
                    </>
                ))}
            </ul>
        </div>
    )
}

export const FetchPost = ({id}) => {
    const [post, setPost] = useState({})
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

    return (
        <div>
           {post.title}
        </div>
    )
}

