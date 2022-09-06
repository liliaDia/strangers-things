
import { login } from "../Api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Login = ({
  token,
  setToken,
  username,
  setUsername,
  password,
  setPassword,
}) => {
 const Navigate = useNavigate();

  const register = async () => {
    
    const data = await login(username,password);
    console.log(data);
    setToken(data);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await register();
    console.log(token)
    Navigate('/Profile',{state:token})
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        username:
        <input
          id="username"
          placeholder="username"
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
        ></input>
        password:
        <input
          id="password"
          placeholder="password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        ></input>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default Login;
