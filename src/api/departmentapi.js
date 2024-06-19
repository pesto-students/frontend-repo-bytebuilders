import apiRequest from './apiRequest';

export const getAllDepartments = async () => {
  const res = await apiRequest.get('get-all-departments');
  return res.data;
};

export const addDepartments = async (data) => {
  const res = await apiRequest.post('add-department', { name: data });
  return res.data;
};
