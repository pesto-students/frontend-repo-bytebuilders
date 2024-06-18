import apiRequest from './apiRequest';

export const loginUserAPI = async (email, password) => {
  const res = await apiRequest.post('login', {
    email,
    password,
  });
  return res;
};
