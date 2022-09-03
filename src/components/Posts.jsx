import { useState } from "react"
import { useEffect } from "react"


const baseUrl = 'https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt'

const Posts = () =>{
   const [posts,setPosts]= useState([])

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