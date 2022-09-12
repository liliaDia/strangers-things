import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Posts from "./components/Posts";
import Profile from "./components/Profile";
import { useState } from "react";
import AccountForm from "./components/AccountForm";
import CreatePosts from "./components/CreatePost";
import MessageForm from "./components/MessageForm";

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  const logout = () => {
    setToken("");
    navigate("/Account/login");
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light ">
          <Link className="ml-10" to="/Profile" state={token}>
            Profile
          </Link>
          <Link to="/" state={token}>
            Posts
          </Link>
          <div>
            {token ? (
              <button className="mr-10" onClick={logout}>
                logout
              </button>
            ) : (
              <>
                <Link className="mr-10" to="/Account/signup">
                  Register
                </Link>
                <Link className="mr-10" to="/Account/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </nav>
        <div>
          <Routes>
            <Route
              path="/Account/:action"
              element={<AccountForm setToken={setToken} token={token} />}
            ></Route>
            <Route
              path="/"
              element={<Posts setId={setId} token={token} />}
            ></Route>
            <Route
              path="/MessageForm"
              element={<MessageForm id={id} token={token} state={token} />}
            ></Route>
            <Route
              path="/CreatePosts"
              element={<CreatePosts token={token} />}
            ></Route>
            <Route path="/Profile" element={<Profile token={token} />}></Route>
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
