import apiRequest from './apiRequest';

export const getAlldesignations = async (token) => {
  const res = await apiRequest.get('get-all-designations', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addDesignations = async (data, token) => {
  const res = await apiRequest.post(
    'add-designation',
    { name: data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
