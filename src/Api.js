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
    return data
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
  try{
    const result = await fetch(baseUrl+"/users/login", options);
    const data= await result.json();
    const token = data.data.token;
    return token;
  }
  catch(err){console.error(err)}
}

async function newPost(token,title,description,price,location="on request",delivery=false){
  const options= {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      post: {
        title: title,
        description: description,
        price: price,
        location:location,
        willDeliver: delivery
      }
  })}
  try{
    const result= await fetch(baseUrl+"/posts",options)
    const data = await result.json();
    console.log(data)
    return data
  }
  catch(err){console.error(err)}
  }

export { registerUser, userProfile, login, newPost };
