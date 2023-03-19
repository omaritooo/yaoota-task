import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async () => {
  return (await axios.get(`${BASE_URL}/users`)).data;
};
export const fetchPosts = async () => {
  return (await axios.get(`${BASE_URL}/posts`)).data;
};
export const fetchPost = async (id) => {
  return (await axios.get(`${BASE_URL}/post?id=${id}`)).data;
};
export const fetchComments = async (id) => {
  return (await axios.get(`${BASE_URL}/comments?postId=${id}`)).data;
};

export const createComment = async (id, comment) => {
  return (await axios.post(`${BASE_URL}/posts/${id}/comments`, comment)).data;
};
