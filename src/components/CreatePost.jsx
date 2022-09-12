import { useState } from "react";
import { newPost,editPost } from "../Api";
import { useNavigate, useLocation, } from "react-router-dom";
const CreatePosts = ({ token }) => {
  const { post } = useLocation().state;
  const {postId} = useLocation().state

  const [title, setTitle] = useState(post ? post.title : "");
  const [description, setDescription] = useState(post ? post.description : "");
  const [price, setPrice] = useState(post? post.price : "");
  const [location, setLocation] = useState(post? post.location : "");
  const [delivery, setDelivery] = useState(post? post.willDelivery :false);
  const [postCreated, setPostCreated] = useState(false);
  const navigate = useNavigate();

 const newPostInfo = async () => {
    const data = await newPost(
      token,
      title,
      description,
      price,
      location,
      delivery
    );
    return data;
    }
const editPostInfo = async () => {
      const data = await editPost(
        token,
        postId,
        {title,
        description,
        price,
        location,
        delivery}
      );
      return data;
      }

  const onSubmit = (event) => {
    event.preventDefault();
    post? editPostInfo(): newPostInfo();
    setPostCreated(true);
  };

  return (
    <div className="bg-white p-10 mt-6">
      <h1 className="p-10 text-5xl">Stranger's Things</h1>
      <div className="border-solid border-2 border-blue-200 m-5 p-5 ">
        <form>
          <input
            className="text-gray-500  h-10 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="title"
            placeholder="title"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required
          ></input>
          <br></br>
          <input
            className="text-gray-500  h-10 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="description"
            type="text"
            placeholder="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            required
          ></input>
          <br></br>
          <input
            className="text-gray-500  h-10 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="price"
            type="text"
            placeholder="price"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            value={price}
            required
          ></input>
          <br></br>
          <input
            className="text-gray-500  h-10 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="location"
            placeholder="location"
            type="text"
            onChange={(event) => {
              setLocation(event.target.value);
            }}
            value={location}
          ></input>
          <br></br>
          <label>willing to deliver? </label>
          <input
            value={delivery}
            id="delivery"
            type="checkbox"
            onChange={() => {
              setDelivery(true);
            }}
          ></input>
          <br></br>
          <button
            className="inline-block px-6 py-2 border-2 border-indigo-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            type="submit"
            onClick={(event) => {
              onSubmit(event);
            }}
          >
            submit
          </button>
          {postCreated && (
            <>
              {post? <h4>Post Updated</h4>:<h4>Post Created</h4>}
              <button
                onClick={() => navigate("/")}
                type="button"
                className="inline-block px-6 py-2 border-2 border-indigo-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Back to Posts
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
export default CreatePosts;
