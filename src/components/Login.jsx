import { userProfile } from "../Api";
import { login } from "../Api";

import { Navigate, useNavigate } from "react-router-dom";
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
    const data = await login("art", "karen");
    //console.log(data);
    setToken(data);
  };

  useEffect(() => {
    register();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    register();
    Navigate('/Profile',{state:{token}})
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
          onSubmit={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        password:
        <input
          id="password"
          placeholder="password"
          type="password"
          onSubmit={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <button type="submit ">SUBMIT</button>
      </form>
    </div>
  );
};

export default Login;
