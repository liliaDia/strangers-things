

import { userProfile } from "../Api"
import { useLocation } from "react-router-dom"
import { useEffect } from "react";
import { useState } from "react";
import { deletePost } from "../Api";

const Profile= ({token})=>{
    const [user,setUser]=useState(null)
    //const token= useLocation().state;
    console.log(token)


 async function getInfo(){
    const userObj = await userProfile((token))
    setUser(userObj)
    }

    useEffect(()=>{
        getInfo()
    },[token])
   
    if (user===null){return}
    console.log(user);
const myPosts= user.posts
const msg= user.messages


  console.log(myPosts)
    return(
        <div>
            <h1>profile</h1>
            <h3>messages</h3>
            {
            msg.map((message)=>{
                return(
                <>
                <div key={message.id}>
                <h5>{message.fromUser.username}</h5>
                <h5>{message.content}</h5>
                </div>
                </>)
            })
          }
            <h3>posts</h3>
        
          {
            myPosts.active?
            myPosts.map((post)=>{
                return(
                    <>
                    <div key={post.id}>
                    <h4>{post.title}</h4>
                    <button id={post._id} onClick={(event)=>{
                        deletePost(token.event.target.id)}}>
                    delete post</button>
                    </div>
                    </>
                )
            }):null
          }
          
        </div>
    )
}
export default Profile