import { registerUser } from "../Api";
import { userProfile } from "../Api";
import { Navigate, useNavigate } from "react-router-dom";

const Register=({token, setToken, username, setUsername, password, setPassword})=>{
    
    const Navigate = useNavigate()

        
    const register =async()=>
    {const data= await registerUser('lilia2',"diaz") 
    
        setToken(data)
    
    }
    
    const onSubmit=(event)=>{
        event.preventDefault()
        register();
        Navigate('/Profile',{state:{token}})
    }


    return (
    <div>
        <h2>Register</h2>
        <form onSubmit={onSubmit}>
            username:
            <input 
            id="username"
            placeholder='username'
            type='text'
            onSubmit={(event =>{setUsername(event.target.value)} )}
           
           ></input>
            password:<input 
            id='password'
            placeholder='password'
            type='password'
            onSubmit={(event => {setPassword(event.target.value)})}></input>
            <button type="submit ">SUBMIT</button>
       
        </form>
    </div>

)}

export default Register;