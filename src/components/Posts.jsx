import { useState } from "react"
import { useEffect } from "react"

import { useNavigate,useLocation} from "react-router-dom";
const baseUrl = 'https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt'

const Posts = () =>{

   const Navigate = useNavigate();
   const [posts,setPosts]= useState([])
   const [searchTerm,setSearchTerm]= useState('')
   const token=useLocation().state;

   const fetchPosts= async ()=>{
      const response= await fetch(baseUrl+'/posts')
      const info = await response.json()
      const data= info.data;
      const posts= data.posts
     setPosts(posts)
   }

   const postMatches = (post,txt) => {
      const specificPost =post.title.includes(txt) || post.description.includes(txt)||post.author.username.includes(txt)
      return specificPost 
   }
 
useEffect(()=>{
   fetchPosts();   
},[])
console.log(posts)
console.log(token)

const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
const postsToDisplay = searchTerm.length ? filteredPosts : posts;


   return(
    <div>
     <h1>All posts</h1>
     <label>search:</label><input onChange={(event)=>{setSearchTerm(event.target.value)}}></input>
      <button  onClick={() => Navigate("/CreatePosts",{state:{token}})} >create post</button>
   {}
    { postMatches? 
    (postsToDisplay.map((post)=>{
      return(
         <div key={post._id}>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
            <button onClick={()=> Navigate("/MessageForm", {state:{token, postId: post._id}})}>send Message</button>
         </div>
      )
    })):
    
    (posts.map((post)=>{
      return(
         <div key={post._id}>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
            <button onClick={()=> Navigate("/MessageForm", {state:{token, postId: post._id}})}>send Message</button>
         </div>
      )
    }))}
    </div>
   )
}
export default Posts;