import apiRequest from './apiRequest';

export const getAlldesignations = async () => {
  const res = await apiRequest.get('get-all-designations');
  return res.data;
};

export const addDesignations = async (data) => {
  const res = await apiRequest.post('add-designation', {
    name: data,
  });
  return res.data;
};
