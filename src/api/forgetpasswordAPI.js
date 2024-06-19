import apiRequest from './apiRequest';

export const setOTPAPI = async (email) => {
  const res = await apiRequest.post('forgot-password', {
    email: email,
  });
  return res;
};

export const confirmPassword = async ({
  email,
  newPassword,
  otp,
}) => {
  const res = await apiRequest.post('confirm-otp', {
    email,
    newPassword,
    otp,
  });
  return res;
};

export const resetPassword = async (id) => {
  const res = await apiRequest.patch('update-password/{id}');
  return res;
};
