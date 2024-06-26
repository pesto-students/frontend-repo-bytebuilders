export const adminPermission = {
  isAdmin: true,
  isEmployeeActive: true,
  isOwner: false,
  casualLeaveDays: 15,
  salary: 6000,
  currency: 'INR',
  medicalLeaveDays: 8,
  lopLeaveDays: 2,
  isReportingManager: true,
  isPayrollExecutive: true,
  basicSalary: 5000,
  hra: 1200,
  pf: 300,
  specialAllowances: 1000,
  canAddEmployees: true,
  canRemoveEmployees: true,
  canUpdateEmployees: true,
  canReadHolidays: true,
  canCreateHolidays: true,
  canDeleteHolidays: true,
  canAcceptOrRejectLeaves: true,
  canReadLeaves: true,
  canCreateLeaves: true,
  department: '',
  designation: '',
};

export const addUserData = {
  isAdmin: false,
  isEmployeeActive: true,
  isOwner: false,
  password: 'ajhshsahjs',
  lopLeaveDays: 0,

  canAddEmployees: false,
  canRemoveEmployees: false,
  canUpdateEmployees: false,
  canReadHolidays: false,
  canCreateHolidays: false,
  canDeleteHolidays: false,
  canAcceptOrRejectLeaves: false,

  canReadLeaves: false,
  canCreateLeaves: false,

  currency: 'INR',
};

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
