const baseUrl = "https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt";

async function registerUser(username, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  };
  try {
    const result = await fetch(baseUrl + "/users/register", options);
    const data = await result.json();
    const token = data.data.token;
    return token;
  } catch (err) {
    console.error(err);
  }
}

async function login(username, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  };
  try {
    const result = await fetch(baseUrl + "/users/login", options);
    const data = await result.json();
    const token = data.data.token;

    return token;
  } catch (err) {
    console.error(err);
  }
}

async function fetchPosts(token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(baseUrl + "/posts", options);
    const info = await response.json();
    const data = info.data;
    const posts = data.posts;
    return posts;
  } catch (err) {
    console.error(err);
  }
}

async function userProfile(token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const result = await fetch(baseUrl + "/users/me", options);
    const data = await result.json();
    return data.data;
  } catch (err) {
    console.error(err);
  }
}

async function newPost(
  token,
  title,
  description,
  price,
  location = "on request",
  willDeliver = false
) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title,
        description,
        price,
        location,
        willDeliver,
        isAuthor: true,
      },
    }),
  };
  try {
    const result = await fetch(baseUrl + "/posts", options);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function deletePost(token, id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const result = await fetch(baseUrl + `/posts/${id}`, options);
    const data = await result.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function sendMessage(token, content, postId) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: {
        content: content,
      },
    }),
  };

  try {
    const result = await fetch(baseUrl + `/posts/${postId}/messages`, options);
    await result.json();
  } catch (err) {
    console.error(err);
  }
}

async function editPost(token,id,{title,description,price,location,willDeliver}){
const options = {
  method:"PATCH",
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body:JSON.stringify({
    post:{
      title,
      description,
      location,
      price,
      willDeliver,
  }})
}
try{
const result = await fetch(baseUrl+`/posts/${id}`,options);
await result.json();
}catch(err){
console.error(err)
}
}
export {
  registerUser,
  userProfile,
  login,
  newPost,
  deletePost,
  sendMessage,
  fetchPosts,
  editPost
};
