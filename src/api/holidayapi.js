import apiRequest from './apiRequest';

export const getHolidayAPI = async () => {
  const res = await apiRequest.get('get-all-holidays');
  return res.data;
};
