

import { userProfile } from "../Api"
import { useLocation } from "react-router-dom"
import { useEffect } from "react";
import { useState } from "react";

const Profile= ({token})=>{
    const [user,setUser]=useState({})
    const {state}= useLocation();
    const auth = state.token

 async function getInfo(){
    const userObj = await userProfile((auth))
    console.log (userObj)
    setUser(userObj)
    }

    useEffect(()=>{
        getInfo()
    },[])

    const posts = user.posts
    const messages= user.messages
    const id= user._id
    const name= user.username
    
    return(
        <div>
            <h1>profile</h1>
        </div>
    )
}
export default Profile