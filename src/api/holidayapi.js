import apiRequest from './apiRequest';

export const getHolidayAPI = async () => {
  const res = await apiRequest.get('get-all-holidays');
  return res.data;
};

export const addHoliday = async (date, name) => {
  const res = await apiRequest.post('add-holiday', { date, name });
  return res.data;
};
