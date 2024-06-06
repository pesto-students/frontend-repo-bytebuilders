import axios from 'axios';

const apiRequest = await axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true,
});

export default apiRequest;
