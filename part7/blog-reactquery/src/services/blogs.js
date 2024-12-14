import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => axios.get(baseUrl).then((res) => res.data);

const createNew = (newObject) => {
  const config = {
    headers: { Authorization: token }
  };

  axios.post(baseUrl, newObject, config).then((res) => res.data);
};

const likeBlog = async (content) => {
  console.log('likeblog', { content });
  const object = { ...content, likes: content.likes + 1 };
  return axios.put(`${baseUrl}/${object.id}`, object).then((res) => res.data);
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

const commentBlog = async (content, comment) => {
  const object = { ...content, comments: [...content.comments, comment] };
  const response = await axios.put(`${baseUrl}/${object.id}/comments`, object);
  return response.data;
};

export default { getAll, setToken, createNew, update, deleteBlog, likeBlog, commentBlog };
