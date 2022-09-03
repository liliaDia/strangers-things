import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import './App.css';
import Posts from './components/Posts';
import Register from './components/Register';
import Profile from './components/Profile';
import { useState } from "react";
import Login from './components/Login';
import CreatePosts from './components/CreatePost';

function App() {
  const [token, setToken] = useState('')
  const [username, setUsername]=useState('');
  const [password, setPassword]= useState('');
  return (

    <div className="App">
      <header className="App-header">
      <BrowserRouter>
     <nav>
      <Link to ='/Register'>Register</Link>
      <Link to='/Login'>Login</Link>
      <Link to='/Posts' state={token} >Posts</Link>
      
     </nav>
      <div>
        <Routes>
        <Route path= '/Register' element= {<Register setToken={setToken} setPassword={setPassword} password={password} username={username} setUsername={setUsername} token={token}/>}></Route>
        <Route path= '/Login' element= {<Login setToken={setToken} setPassword={setPassword} password={password} username={username} setUsername={setUsername} token={token}/>}></Route>
        <Route path= '/Posts' element={<Posts />}></Route>
        <Route path= '/CreatePosts' element={<CreatePosts token={token} state={token}/>}></Route>
        <Route path= '/Profile' element= {<Profile token={token}/>}></Route>

        </Routes>
        </div>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
