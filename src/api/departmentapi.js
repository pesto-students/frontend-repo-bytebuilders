import apiRequest from './apiRequest';

export const getAllDepartments = async (token) => {
  const res = await apiRequest.get('get-all-departments', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addDepartments = async (data, token) => {
  const res = await apiRequest.post(
    'add-department',
    { name: data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
