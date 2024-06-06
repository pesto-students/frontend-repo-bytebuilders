import apiRequest from './apiRequest';

export const getLeaveHistoryAPI = async (token) => {
  const res = await apiRequest.get('get-leave-history', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
