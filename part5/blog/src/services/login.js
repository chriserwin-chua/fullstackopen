import axios from 'axios';
const baseUrl = '/api/login';

const loginUser = (credentials) => {
  const request = axios.post(baseUrl, credentials);
  return request.then((response) => response.data);
};

export default { loginUser };
