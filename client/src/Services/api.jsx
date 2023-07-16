export async function createComment(postId, content, parentId) {
  let res = await fetch(
    `http://localhost:5000/api/comments/CreateComment/${postId}`,
    {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        parentId: parentId,
      }),
    }
  );
  return await res.json();
}
export async function editComment(postId, content) {
  let res = await fetch(
    `http://localhost:5000/api/comments/UpdateComment/${postId}`,
    {
      method: "put",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: content, id: postId }),
    }
  );
  return await res.json();
}
export async function getRandomUsers() {
  let res = await fetch("http://localhost:5000/api/users/GetRandomUser");
  return await res.json();
}
export async function editPost(postId, content) {
  let res = await fetch(
    `http://localhost:5000/api/posts/UpdatePost/${postId}`,
    {
      method: "put",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: content, id: postId }),
    }
  );
  return await res.json();
}
export async function deletePost(postId) {
  let res = await fetch(
    `http://localhost:5000/api/posts/DeletePost/${postId}`,
    {
      method: "delete",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: postId }),
    }
  );
  return await res.json();
}
export async function likePost(postId) {
  let res = await fetch(`http://localhost:5000/api/posts/likePost/${postId}`, {
    method: "put",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: postId }),
  });
  return await res.json();
}
export async function getPosts(sort) {
  let res = await fetch(
    `http://localhost:5000/api/posts/GetPosts?sortBy=${sort}`,
    {
      method: "GET",
    }
  );
  return await res.json();
}
export async function createPost(title, content) {
  let res = await fetch(`http://localhost:5000/api/posts/CreatePost`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, content: content }),
  });

  return await res.json();
}
export async function getProfile(userId) {
  let res = await fetch(`http://localhost:5000/api/users/GetProfile/${userId}`);

  return await res.json();
}
export async function GetTopPosts() {
  let res = await fetch("http://localhost:5000/api/posts/GetTopPosts");
  return await res.json();
}
export async function login(Email, Password) {
  let res = await fetch("http://localhost:5000/api/auth/Login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Email: Email,
      Password: Password,
    }),
  });
  return await res.json();
}
export async function GetPost(postId) {
  let res = await fetch(`http://localhost:5000/api/posts/GetPost/${postId}`);
  return  res.json();
}
export async function GetPostComments(postId) {
  let res = await fetch(
    `http://localhost:5000/api/comments/GetPostComments/${postId}`
  );
  return await res.json();
}
export async function GetUserPosts(userId) {
  let res = await fetch(
    `http://localhost:5000/api/posts/GetUserPosts/${userId}`
  );
  return await res.json();
}
export async function GetUserLikedPosts(userId) {
  let res = await fetch(
    `http://localhost:5000/api/posts/GetUserLikedPosts/${userId}`
  );
  
  return await res.json();
}
export async function GetUserComments(userId) {
  let res = await fetch(
    `http://localhost:5000/api/comments/GetUserComments/${userId}`
  );
  return await res.json();
}
export async function GetUser() {
  let res = await fetch(`http://localhost:5000/api/users/GetUser`, {
    method: "get",
    credentials: "include",
  })
  return await res.json();
}
export async function logout() {
  return await fetch("http://localhost:5000/api/auth/logout", {
      method: "GET",
      credentials: "include",
    })
}
export async function Register(data) {
  let res = await fetch("http://localhost:5000/api/auth/Register", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return  res.json();
}



