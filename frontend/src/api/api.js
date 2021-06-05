import React, {useState, useEffect} from 'react';
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

