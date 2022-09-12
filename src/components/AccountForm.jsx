import { login } from "../Api";
import { registerUser } from "../Api";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const AccountForm = ({ setToken }) => {
  const Navigate = useNavigate();
  const { action } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const fr = action === "login" ? login : registerUser;
    const data = await fr(username, password);
    setToken(data);
    Navigate("/Profile");
  };

  return (
    <div>
      <header>
        <h1 className="p-10 text-5xl">Stranger's Things</h1>
        <h2>{action === "login" ? "login" : "signup"}</h2>
      </header>
      <form
        className="rounded-md p-10 flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 border-solid border-2 border-indigo-600"
        onSubmit={onSubmit}
      >
        <label className="p-2">Username:</label>
        <input
          className="form-control block w-1/4 px-4 m-4py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="username"
          placeholder="username"
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
          required
        ></input>
        <label className="p-2">Password:</label>
        <input
          className="form-control block w-1/4 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="password"
          placeholder="password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
          required
        ></input>
        <button className="inline-block px-6 py-2 border-2 border-indigo-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        type="submit">
           {action === "login" ? "LOGIN" : "SIGN UP"}
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
