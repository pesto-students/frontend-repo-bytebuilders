import apiRequest from './apiRequest';

export const getLeaveHistoryAPI = async () => {
  const res = await apiRequest.get('get-leave-history');
  return res.data;
};

export const addleave = async (data, token) => {
  const res = await apiRequest.post(
    'add-leave',

    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};

export const processLeaveAPI = async (data, token) => {
  const res = await apiRequest.post('process-leave', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const leaveRequestAPI = async (token) => {
  const res = await apiRequest.get('leave-requests', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};

export const employeeOnLeaveAPI = async () => {
  const res = await apiRequest.get('query-leave-employees');
  return res;
};
