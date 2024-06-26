import apiRequest from './apiRequest';

export const getPunchDataAPI = async () => {
  const res = await apiRequest.get('punch-data');
  return res.data;
};

export const punchInAPI = async () => {
  try {
    const res = await apiRequest.post('punch-in');
    return res.data; 
  } catch (error) {
    throw error; 
  }
};

export const punchOutAPI = async () => {
  try {
    const res = await apiRequest.post('punch-out');
    return res.data; 
  } catch (error) {
    throw error; 
  }
};
