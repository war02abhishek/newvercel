import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000/" });
//sm-memory.herokuapp.com/

//our middleware will not work if we not include this
https: API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user"))._id
    }`;
  }

  return req;
});


export const loadUser = () => API.get(`api/v1/me`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const login = ({email,password,config}) => API.post(
   `/api/v1/login`,
   { email, password });
export const signUp = (formData) => API.post("/user/signup", formData);
