import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createNew = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
const likeBlog = async (content) => {
  const object = { ...content, likes: content.likes + 1 };
  const response = await axios.put(`${baseUrl}/${object.id}`, object);
  return response.data;
};

const commentBlog = async (content, comment) => {
  const object = { ...content, comments: [...content.comments, comment] };
  const response = await axios.put(`${baseUrl}/${object.id}/comments`, object);
  return response.data;
};

export default { getAll, setToken, createNew, update, deleteBlog, likeBlog, commentBlog };
