import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendMessage } from "../Api";

const MessageForm = ({ token }) => {
  const navigate = useNavigate();

  const { postId } = useLocation().state;
  const [content, setContent] = useState("");
  const [sent, setsent] = useState(false);

  const onSubmit = async (event) => {
    try{
    event.preventDefault();
    await sendMessage(token, content, postId);
    setsent(true);
    }catch(err){console.error(err)}
  };

  return (
    <div className="bg-white p-10 mt-6">
      <form onSubmit={onSubmit}>
        <label>Message to Seller</label>
        <input
          type={"text"}
          size={"35"}
          className="text-gray-500  h-10 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          onChange={(event) => {
            setContent(event.target.value);
          }}
          required
        ></input>
        <button
          className="inline-block px-6 py-2 border-2 border-indigo-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          type="submit"
        >
          submit
        </button>
        {sent ? (
          <>
            <h5>Message Sent</h5>
            <button
              type="button"
              className="inline-block px-6 py-2 border-2 border-indigo-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              onClick={() => navigate("/")}
            >
              back to posts
            </button>
          </>
        ) : null}
      </form>
    </div>
  );
};
export default MessageForm;
