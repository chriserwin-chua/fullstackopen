import axios from 'axios';
const baseUrl = '/api/login';

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (e) {
    return e.response;
  }
};

export default { loginUser };
