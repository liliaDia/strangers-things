import { useState } from "react";
import { useLocation } from "react-router-dom"
import { sendMessage } from "../Api";

const MessageForm = () => {
   
    const {token, postId} = useLocation().state;
    const [content, setContent]= useState('')
    console.log(token)
    const onSubmit=(event)=>{
        event.preventDefault();
        sendMessage(token,content,postId)
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
               <label>message to user</label> <input type={'text'}
               onChange={(event)=>{setContent(event.target.value)}}></input>
               <button type='submit'>submit</button>
            </form>
        </div>
    )
    
}
export default MessageForm