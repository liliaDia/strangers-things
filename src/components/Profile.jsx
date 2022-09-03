

import { userProfile } from "../Api"
import { useLocation } from "react-router-dom"
import { useEffect } from "react";
import { useState } from "react";

const Profile= ({token})=>{
    const [user,setUser]=useState(null)
    const {state}= useLocation();
    const auth = state.token

    

 async function getInfo(){
    const userObj = await userProfile((auth))
    setUser(userObj)
    }

    useEffect(()=>{
        getInfo()
    },[])

    if (user===null){return}

const msg= user.data.messages
console.log(msg)
   
    return(
        <div>
            <h1>profile</h1>
            <h3>messages</h3>
          
           
        </div>
    )
}
export default Profile