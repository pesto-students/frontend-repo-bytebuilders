import React, { useEffect, useState } from 'react';
import './EmployeeDetails.css';

import { format, parseISO } from 'date-fns';
import EmployeePermissionButton from '../EmployeePermisionButton/EmployeePermissionButton';
import { Link, useNavigate } from 'react-router-dom';
import { employeeDeactivateAPI } from '../../../api/userAPI';
import { useSelector } from 'react-redux';
import { resetPasswordAPI } from '../../../api/forgetpasswordAPI';

export default function EmployeeDetails({
  user,
  handleChange,
  editflag,
  handleClick,
  setUser,
  setMessageStatus = null,
  responseStatus = null,
  setResponseStatus = null,
}) {
  const storedUser = useSelector((state) => state.user);
  const [userFlag, setUserFlag] = useState(false);
  const storeUser = useSelector((state) => state.user);
  const [managerFlag, setManagerFlag] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleToggle = (e) => {
    let { name } = e.target;

    setUser({
      ...user,
      [name]: !user[name],
    });
  };

  const deactivateEmployee = async () => {
    try {
      const res = await employeeDeactivateAPI(user._id);
      setMessageStatus({
        status: 'OK',
        message: 'Employee deactivated.........',
      });
      setResponseStatus();
      navigate('/organisation');
    } catch (error) {
      if (error.response) {
        setError(error.response.message);
      } else {
        setError(error.message);
      }
    }
  };

  const resetPassword = async (id) => {
    try {
      await resetPasswordAPI(id);
      setMessageStatus({
        status: 'OK',
        message: 'Password send successfully on employee mail....',
      });
      setResponseStatus();
    } catch (error) {
      if (error.response) {
        setError(error.response.message);
      } else {
        setError(error.message);
      }
    }
  };
  useEffect(() => {
    storeUser._id === user._id
      ? setUserFlag(false)
      : setUserFlag(true);
  }, []);

  return (
    <div className="employeeDetailContainer">
      <div className="employeenamedesig">
        <span>{user.fullName}</span>
        <span>
          {user.designation ? user.designation : 'Associate'}
        </span>
      </div>
      <div className="line"></div>
      <div className="employeeDetails">
        <div className="employeeDetailsBoxes">
          <span className="employeeDetailstitles">
            Personal Details
          </span>
          <div className="inputdetails">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              disabled={!editflag || userFlag}
            />
          </div>
          <div className="inputdetails">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editflag || userFlag}
            />
          </div>
          <div className="inputdetails">
            <label htmlFor="dateOfBirth">Date Of Birth</label>
            <input
              type="text"
              name="dateOfBirth"
              onChange={handleChange}
              value={
                user.dateOfBirth
                  ? format(parseISO(user.dateOfBirth), 'yyyy-mm-dd')
                  : ''
              }
              disabled={!editflag || userFlag}
            />
          </div>
          <div className="inputdetails">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!editflag || userFlag}
            />
          </div>
        </div>
        <div className="employeeDetailsBoxes">
          <span className="employeeDetailstitles">
            Employment Details
          </span>
          <div className="inputdetails">
            <label htmlFor="employeeIdentificationCode">
              Employee Identification Code
            </label>
            <input
              type="text"
              name="employeeIdentificationCode"
              value={user.employeeIdentificationCode}
              disabled={true}
            />
          </div>
          <div className="inputdetails">
            <label htmlFor="joiningDate">Joining Date</label>
            <input
              type="text"
              name="joiningDate"
              value={
                user.joiningDate
                  ? format(parseISO(user.joiningDate), 'yyyy-mm-dd')
                  : ''
              }
              disabled={true}
            />
          </div>
          <div className="inputdetails">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              name="department"
              onChange={handleChange}
              value={user.department}
              disabled={!editflag || !userFlag}
            />
          </div>
          <div className="inputdetails">
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              value={
                user.designation ? user.designation : 'Associate'
              }
              disabled={!editflag || !userFlag}
            />
          </div>
        </div>
      </div>
      {userFlag && (
        <>
          {managerFlag && (
            <>
              <div className="line"></div>
              {user.isPayrollExecutive && (
                <div className="employeeDetailsBoxes">
                  <span className="employeeDetailstitles">
                    Pay Roll
                  </span>
                  <div className="employePayrollBox">
                    <span>Salary</span>

                    <input
                      type="number"
                      name="salary"
                      value={user.salary}
                      disabled={!editflag}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="employePayrollBox">
                    <span>Basic Salary</span>

                    <input
                      type="number"
                      name="basicSalary"
                      value={user.basicSalary}
                      disabled={!editflag}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="employePayrollBox">
                    <span>HRA</span>

                    <input
                      type="number"
                      name="hra"
                      value={user.hra}
                      disabled={!editflag}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="employePayrollBox">
                    <span>PF</span>

                    <input
                      type="number"
                      name="pf"
                      value={user.pf}
                      disabled={!editflag}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="employePayrollBox">
                    <span>Special Allowances</span>

                    <input
                      type="number"
                      name="specialAllowances"
                      value={user.specialAllowances}
                      disabled={!editflag}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              <div className="line"></div>
              <div className="employeeDetailsBoxes">
                <span className="employeeDetailstitles">
                  Leave Data
                </span>
                <div className="employeeLeaveBox">
                  <span>Medical Leave</span>

                  <input
                    type="number"
                    name="medicalLeaveDays"
                    value={user.medicalLeaveDays}
                    disabled={!editflag}
                    onChange={handleChange}
                    min={0}
                    max={12}
                  />
                </div>
                <div className="employeeLeaveBox">
                  <span>Earned Leave</span>

                  <input
                    type="number"
                    name="lopLeaveDays"
                    disabled={!editflag}
                    value={user.lopLeaveDays}
                    onChange={handleChange}
                    min={0}
                    max={12}
                  />
                </div>
                <div className="employeeLeaveBox">
                  <span>Casual Leave</span>
                  <input
                    type="number"
                    name="casualLeaveDays"
                    disabled={!editflag}
                    value={user.casualLeaveDays}
                    onChange={handleChange}
                    min={0}
                    max={12}
                  />
                </div>
              </div>
            </>
          )}
          <div className="line"></div>
          <div className="employeeDetailsBoxes">
            <span className="employeeDetailstitles">Permissions</span>
            <div className="permissionbox">
              <span>Can add Employee ?</span>

              <EmployeePermissionButton
                editflag={!editflag}
                value={user.canAddEmployees}
                name={'canAddEmployees'}
                handleToggle={handleToggle}
              />
            </div>
            <div className="permissionbox">
              <span>Can Remove Employee ?</span>

              <EmployeePermissionButton
                editflag={!editflag}
                value={user.canRemoveEmployees}
                name={'canRemoveEmployees'}
                handleToggle={handleToggle}
              />
            </div>
            <div className="permissionbox">
              <span>Can Accept or Reject Leave ?</span>
              <EmployeePermissionButton
                editflag={!editflag}
                value={user.canAcceptOrRejectLeaves}
                name={'canAcceptOrRejectLeaves'}
                handleToggle={handleToggle}
              />
            </div>
            <div className="permissionbox">
              <span>Can Create Holiday ?</span>
              <EmployeePermissionButton
                editflag={!editflag}
                value={user.canCreateHolidays}
                name={'canCreateHolidays'}
                handleToggle={handleToggle}
              />
            </div>
            <div className="permissionbox">
              <span>Can manage Payroll ?</span>
              <EmployeePermissionButton
                editflag={!editflag}
                value={user.isPayrollExecutive}
                name={'isPayrollExecutive'}
                handleToggle={handleToggle}
              />
            </div>
          </div>
        </>
      )}
      {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
      {responseStatus.message && (
        <p
          style={
            responseStatus.status === 'OK'
              ? { color: '#30D143' }
              : { color: '#ED715F' }
          }
        >
          {responseStatus.message}
        </p>
      )}
      <div className="bottomContainer">
        {userFlag && (
          <>
            <button onClick={handleClick}>
              {editflag ? 'Save' : 'Edit'} Info
            </button>

            <button
              onClick={deactivateEmployee}
              style={{
                background: '#EE404C40',
                color: '#EE404C',
              }}
            >
              Deactivate
            </button>
            {storedUser.isAdmin && (
              <button onClick={() => resetPassword(user._id)}>
                Reset Password
              </button>
            )}
            <button onClick={() => navigate('/organisation')}>
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
