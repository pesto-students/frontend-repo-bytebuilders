import apiRequest from './apiRequest';

export const getUser = async (id, token) => {
  const res = await apiRequest.get(`get-particular-employee/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUser = async (user, token) => {
  const res = await apiRequest.put(`employees/${user._id}`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const employeeListAPI = async () => {
  const res = await apiRequest.get(`get-all-employees`);
  return res.data;
};

export const employeeDeactivateAPI = async (id, token) => {
  const res = await apiRequest.post(
    `employees-deactivate/${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const addEmployee = async (data, token) => {
  const res = await apiRequest.post(
    `add-employee`,
    { data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
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
