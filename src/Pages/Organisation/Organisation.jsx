import React, { useEffect, useState } from 'react';
import './Organisation.css';
import EmployeeCard from '../../components/Employee/EmployeeCard/EmployeeCard';
import { employeeListAPI } from '../../api/userAPI';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Organisation() {
  const [employeeList, setEmployeeList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleCardClick = (id) => {
    navigate(`/employee/${id}`);
  };

  const getAllEmployee = async () => {
    try {
      const res = await employeeListAPI();

      const list = res.data.filter((obj) => obj.isEmployeeActive);
      setEmployeeList(list);
      setFilterList(list);
    } catch (error) {}
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;

    setQuery(searchTerm);

    if (searchTerm !== '') {
      const filteredResults = employeeList.filter((employee) =>
        employee.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilterList(filteredResults);
    }
  };

  useEffect(() => {
    if (employeeList.length === 0) {
      getAllEmployee();
    }
  }, []);
  return (
    <div className="organisation">
      <h1>Organisation</h1>
      <div className="addEmployeeButtonContainer">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
        />
        {user.canAddEmployees && (
          <button onClick={() => navigate('/addemployee')}>
            Add Employee
          </button>
        )}
      </div>
      <div className="organisationList">
        {filterList.map((employee) => (
          <EmployeeCard
            key={employee._id}
            Employee={employee}
            onClick={() => handleCardClick(employee._id)}
          />
        ))}
      </div>
    </div>
  );
}
