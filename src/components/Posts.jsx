import { useState, useEffect } from "react";
import { fetchPosts } from "../Api";
import { useNavigate } from "react-router-dom";

const Posts = ({ token }) => {
  const Navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getPosts = async () => {
    const result = await fetchPosts(token);
    setPosts(result);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const postFieldMatchesSearch = (search, field) => {
    return field.toLowerCase().includes(search.toLowerCase());
  };

  const postMatches = (post, txt) => {
    const { title, description, author } = post;

    const specificPost =
      postFieldMatchesSearch(txt, title) ||
      postFieldMatchesSearch(txt, description) ||
      postFieldMatchesSearch(txt, author.username);
    return specificPost;
  };

  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <div className="bg-white p-10 mt-6">
      <h1 className="p-5 text-5xl">Stranger's Things</h1>
      <h1 className="text-xxxl m-5">POSTS</h1>
      <input
        placeholder="search"
        className="text-gray-500  h-10 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      ></input>
      {token && (
        <button
          className="pl-5"
          onClick={() => Navigate("/CreatePosts", { state: { token } })}
        >
          post +
        </button>
      )}
      {postMatches
        ? postsToDisplay.map((post) => {
            return (
              <div
                key={post._id}
                className="border-solid border-2 border-blue-200 m-5 p-5 "
              >
                <h4>{post.title}</h4>
                <div className="text-m">
                  <p>{post.description}</p>
                  <p>{post.author.username}</p>
                  <p>{post.price}</p>
                  <p>Location:{post.location}</p>
                  <p>Will Deliver:{post.willDeliver? "yes":"no"}</p>
                </div>
                {token && !post.isAuthor && (
                  <button
                    className="inline-block px-6 py-2 border-2 border-blue-200 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    onClick={() =>
                      Navigate("/MessageForm", {
                        state: { token, postId: post._id },
                      })
                    }
                  >
                    send Message
                  </button>
                )}
              </div>
            );
          })
        : posts.map((post) => {
            return (
              <div key={post._id}>
                <h4>{post.title}</h4>
                <p>{post.description}</p>
                <button
                  onClick={() =>
                    Navigate("/MessageForm", {
                      state: { token, postId: post._id },
                    })
                  }
                >
                  send Message
                </button>
              </div>
            );
          })}
    </div>
  );
};
export default Posts;
