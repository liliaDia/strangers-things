import { userProfile, deletePost } from "../Api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ token }) => {
  const [user, setUser] = useState(null);
  const Navigate = useNavigate();

  async function getInfo() {
    const userObj = await userProfile(token);
    setUser(userObj);
  }

  useEffect(() => {
    getInfo();
  }, []);

  if (user === null) {
    return;
  }
  const myPosts = user.posts;
  const msg = user.messages;
  const activePosts = myPosts.filter((post) => post.active);
  return (
    <div className="bg-white p-10 mt-6">
      <h1 className="p-5 text-5xl">Stranger's Things</h1>
      <h1>welcome {user.username}</h1>
      <h3>MESSAGES</h3>
      {msg.map((message,index) => {
        return (
            <div
            
              className="border-shadow border-2 border-blue-200 m-5 p-5 shadow-inner"
              key={index}
            >
              <h5>From:{message.fromUser.username}</h5>
              <h5>{message.content}</h5>
            </div>
        );
      })}
      <h3>posts</h3>
      {activePosts.map((post) => {
        return (
            <div
              className="border-solid border-2 border-blue-200 m-5 p-5 shadow-inner"
              key={post._id}
            >
              <h4>{post.title}</h4>
              <h4>{post.description}</h4>

              <button
                className="inline-block px-6 py-2 border-2 border-blue-200 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                id={post._id}
                onClick={async (event) => {
                  await deletePost(token, event.target.id);
                  getInfo();
                }}
              >
                delete post
              </button>

              <br></br>
              <button
                type="button"
                id={post._id}
                className="inline-block px-6 py-2 border-2 border-blue-200 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                onClick={() => Navigate("/CreatePosts", { state: { token,post, postId: post._id  } }) }
              >
                edit
              </button>
            </div>
        );
      })}
    </div>
  );
};
export default Profile;
