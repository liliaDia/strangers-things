import { useState } from "react";
import { newPost } from "../Api";
import { useLocation } from "react-router-dom"
const CreatePosts=()=>{
    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const[price,setPrice]=useState("")
    const [location,setLocation]=useState("")
    const {state}= useLocation();
    const token = state.token


const newPostInfo = async ()=>{
    const data = await newPost(token,title,description,price,location)
    console.log(data)
    return data
}



const onSubmit =(event)=>{
    event.preventDefault();
    newPostInfo();
   
}

return(
    <div>
        <form onSubmit={onSubmit}>
        <label>title</label>
        <input
        id="title"
        type="text"
        onChange={(event) => {
            setTitle(event.target.value)
          }}
        value={title}></input>
        <br></br>
        <label>description</label>
        <input
        id="description"
        type="text"
        onChange={(event) => {
            setDescription(event.target.value)
          }}value={description}>
         </input>
        <br></br>
        <label>price</label>
        <input 
        id="price"
        type="text"
        onChange={(event) => {
            setPrice(event.target.value);
          }}
          value={price}></input>
        <br></br>
        <label>location</label>
        <input 
        id="location"
        type="text"
        onChange={(event) => {
            setLocation(event.target.value);
          }}
          value={location}></input>
          <button type="submit">submit</button>
          </form>
            </div>
)
}
export default CreatePosts