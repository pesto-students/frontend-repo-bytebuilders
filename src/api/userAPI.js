import apiRequest from './apiRequest';

export const getUser = async (id) => {
  const res = await apiRequest.get(`get-particular-employee/${id}`);
  return res.data;
};

export const updateUser = async (user) => {
  const {
    _id,
    organisationName,
    created_at,
    organisationUniqueId,
    __v,
    ...userdata
  } = user;
  console.log('userdata', userdata);
  const res = await apiRequest.put(`employees/${_id}`, userdata);
  return res;
};

export const employeeListAPI = async () => {
  const res = await apiRequest.get(`get-all-employees`);
  return res.data;
};

export const employeeDeactivateAPI = async (id) => {
  const res = await apiRequest.post(`employees-deactivate/${id}`, {});
  return res.data;
};

export const addEmployee = async (data) => {
  const res = await apiRequest.post(`add-employee`, data);
  return res.data;
};

export const registerUserAPI = async (data, token) => {
  const res = await apiRequest.post(`register`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserdataAPI = async () => {
  const res = await apiRequest.get(`/get-user-details`);
  return res.data;
};

export const getBirthdayEmployeeAPI = async () => {
  const res = await apiRequest.get(
    `/get-all-employees-birthdays-current-date`
  );
  return res;
};
