import { useState } from "react"
import { useEffect } from "react"

import { Navigate, useNavigate,useLocation} from "react-router-dom";
const baseUrl = 'https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt'

const Posts = () =>{

   const Navigate = useNavigate();
   const [posts,setPosts]= useState([])
   const location=useLocation();
   const token=location.state
   console.log(token)
useEffect(()=>{
   const fetchPosts= async ()=>{
      const response= await fetch(baseUrl+'/posts')
      const info = await response.json()
      const data= info.data;
      const posts= data.posts
     
      setPosts(posts)

      }
   fetchPosts();   
},[])


   return(
    <div>
     <h1>All posts</h1>
   <button  onClick={() => Navigate("/CreatePosts",{state:{token}})} >create post</button>

    { posts.map((post, idx)=>{
      return(
         <div key={idx}>
            <h2>{post.title}</h2>
         </div>
      )
    })}
    </div>
   )
}
export default Posts;