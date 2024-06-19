import apiRequest from './apiRequest';

export const getLeaveHistoryAPI = async () => {
  const res = await apiRequest.get('get-leave-history');
  return res.data;
};

export const addleave = async (data) => {
  const res = await apiRequest.post(
    'add-leave',

    data
  );
  return res;
};

export const processLeaveAPI = async (data) => {
  const res = await apiRequest.post('process-leave', data);
  return res;
};

export const leaveRequestAPI = async () => {
  const res = await apiRequest.get('leave-requests');

  return res;
};

export const employeeOnLeaveAPI = async () => {
  const res = await apiRequest.get('query-leave-employees');
  return res;
};
