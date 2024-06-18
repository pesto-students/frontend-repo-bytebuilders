import apiRequest from './apiRequest';

export const getPunchDataAPI = async (token) => {
  const res = await apiRequest.get('punch-data');
  return res.data;
};

export const punchInAPI = async () => {
  const res = await apiRequest.post('punch-in');
  return res;
};

export const punchOutAPI = async () => {
  const res = await apiRequest.post('punch-out');
  return res;
};
