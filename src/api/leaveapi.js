import apiRequest from './apiRequest';

export const getLeaveHistoryAPI = async () => {
  try {
    const res = await apiRequest.get('get-leave-history');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addleave = async (data) => {
  try {
    const res = await apiRequest.post('add-leave', data);
    return { success: true, message: res.data.message };
  } catch (error) {
    throw error.response.data;
  }
};

export const processLeaveAPI = async (data) => {
  try {
    const res = await apiRequest.post('process-leave', data);
    return { success: true, message: res.data.message };
  } catch (error) {
    throw error.response.data;
  }
};

export const leaveRequestAPI = async () => {
  const res = await apiRequest.get('leave-requests');

  return res;
};

export const employeeOnLeaveAPI = async () => {
  const res = await apiRequest.get('query-leave-employees');
  return res;
};
