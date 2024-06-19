import React, { useEffect, useState } from 'react';
import './AddEmployeeForm.css';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../Dropdown/Dropdown';
import { getAlldesignations } from '../../../api/designationapi';
import { getAllDepartments } from '../../../api/departmentapi';
import { employeeListAPI } from '../../../api/userAPI';
import { useSelector } from 'react-redux';
export default function AddEmployeeForm({
  handleSumbmit,
  formData,
  handleChange,
}) {
  const navigate = useNavigate();
  const [departments, setDepartment] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [reportinManagerList, setReportingManagerList] = useState([]);

  const user = useSelector((state) => state.user);
  const setDepartmentList = async () => {
    try {
      const { data } = await getAllDepartments();
      const deptList = data
        .filter(
          (obj) => obj.organisationName === user.organisationName
        )
        .map((department) => department.name);

      setDepartment(deptList);
    } catch (error) {}
  };
  const setDesignationList = async () => {
    try {
      const { data } = await getAlldesignations();
      const desgList = data
        .filter(
          (obj) => obj.organisationName === user.organisationName
        )
        .map((designation) => designation.name);

      setDesignation(desgList);
    } catch (error) {}
  };
  const setReportingManager = async () => {
    try {
      const { data } = await employeeListAPI();

      const list = data
        .filter((employee) => employee.isReportingManager)
        .map((employee) => employee.fullName);

      setReportingManagerList(list);
    } catch (error) {}
  };
  useEffect(() => {
    if (!departments.length) {
      setDepartmentList();
    }
    if (!designation.length) {
      setDesignationList();
    }
    if (!reportinManagerList.length) {
      setReportingManager();
    }
  }, []);
  return (
    <form onSubmit={handleSumbmit}>
      <div className="addinputarea">
        <div className="EmployeeDetails">
          <h3>Employee Details</h3>
          <div className="addemployeeinput">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="addemployeeinput">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="addemployeeinput">
            <label>Date Of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="addemployeeinput">
            <label>Contact number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="EmployeeDetails">
          <h3>Employment Details</h3>
          <div className="addemployeeinput">
            <label>Employee Identification Code</label>
            <input
              type="text"
              name="employeeIdentificationCode"
              value={formData.employeeIdentificationCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="addemployeeinput">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="addemployeeinput">
            <label>Department</label>

            <Dropdown
              name="department"
              options={departments}
              value={formData.department}
              handleChange={handleChange}
            />
          </div>
          <div className="addemployeeinput">
            <label>Designation</label>

            <Dropdown
              name="designation"
              options={designation}
              value={formData.designation}
              handleChange={handleChange}
            />
          </div>
          <div className="addemployeeinput">
            <label>Reporting Manager</label>

            <Dropdown
              name="reportingManager"
              options={reportinManagerList}
              value={formData.reportingManager}
              handleChange={handleChange}
            />
          </div>
          <div className="addemployeeinput">
            <label>
              <input
                type="checkbox"
                value={formData.isReportingManager}
                checked={formData.isReportingManager}
                name="isReportingManager"
                onChange={handleChange}
              />
              Reporting Manager
            </label>
          </div>
          <div className="addemployeeinput">
            <label>
              <input
                type="checkbox"
                value={formData.isPayrollExecutive}
                checked={formData.isPayrollExecutive}
                name="isPayrollExecutive"
                onChange={handleChange}
              />
              Payroll Executive
            </label>
          </div>
        </div>
      </div>
      <div className="employeeData">
        <div className="EmployeeDetails">
          <h3>Leave Details</h3>
          <div className="addemployeeinput">
            <label>Medical Leave</label>

            <input
              type="number"
              name="medicalLeaveDays"
              value={formData.medicalLeaveDays}
              onChange={handleChange}
              min={0}
              max={12}
            />
          </div>
          <div className="addemployeeinput">
            <label>Casual Leave</label>
            <input
              type="number"
              name="casualLeaveDays"
              value={formData.casualLeaveDays}
              onChange={handleChange}
              min={0}
              max={12}
            />
          </div>
        </div>
        <div className="EmployeeDetails">
          <h3>Salary Details</h3>
          <div className="addemployeeinput">
            <label>salary</label>

            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
          <div className="addemployeeinput">
            <label>Basic Salary</label>

            <input
              type="number"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
            />
          </div>
          <div className="addemployeeinput">
            <label>HRA</label>

            <input
              type="number"
              name="hra"
              value={formData.hra}
              onChange={handleChange}
            />
          </div>
          <div className="addemployeeinput">
            <label>PF</label>

            <input
              type="number"
              name="pf"
              value={formData.pf}
              onChange={handleChange}
            />
          </div>
          <div className="addemployeeinput">
            <label>Special Allownace</label>

            <input
              type="number"
              name="specialAllowances"
              value={formData.specialAllowances}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="addbuttonContainer">
        <button type="submit" className="addbutton">
          Add Employee
        </button>
        <button
          onClick={() => navigate('/organisation')}
          className="addbutton"
        >
          Back
        </button>
      </div>
    </form>
  );
}
