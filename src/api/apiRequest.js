import axios from 'axios';

import { store } from '../Redux/store';
import { disableLoading, enableLoading } from '../Redux/userSlice';
const apiRequest = await axios.create({
  //baseURL: 'http://localhost:8000/api/',
  baseURL: 'https://43.204.152.186:8000/api/',
  withCredentials: true,
});

apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Adjust this to where you store your token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    //store.dispatch(enableLoading());
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiRequest.interceptors.response.use(
  (response) => {
    // Hide loading indicator or spinner
    //store.dispatch(disableLoading());
    return response;
  },
  (error) => {
    // Hide loading indicator or spinner
    //store.dispatch(disableLoading());
    return Promise.reject(error);
  }
);

export default apiRequest;
