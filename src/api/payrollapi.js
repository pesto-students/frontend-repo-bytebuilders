import apiRequest from './apiRequest';

export const generatePayrollAPI = async ({ userId, month, year }) => {
  const res = await apiRequest.post(`generate-payslip`, {
    userId: userId,
    month: month,
    year: year,
  });
  return res;
};

export const getPaySlipAPI = async ({ month, year }) => {
  try {
    const res = await apiRequest.post(`download-payslip`, {
      month: month,
      year: year,
    });
    return res;
  } catch (error) {
    throw error;
  }
};
