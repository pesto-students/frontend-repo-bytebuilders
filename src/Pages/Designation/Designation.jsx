import React, { useEffect, useState } from 'react';
import './Designation.css';
import {
  addDesignations,
  getAlldesignations,
} from '../../api/designationapi';
import DepartmentDesignationTable from '../../components/DepartmentDesignation Table/DepartmentDesignationTable';

export default function Designation() {
  const [designationList, setdesignationList] = useState([]);
  const [designation, setdesignation] = useState('');
  const [addStatus, setAddStatus] = useState(false);
  const token = localStorage.getItem('token');
  const designations = async () => {
    const depart = await getAlldesignations(token);

    setdesignationList(depart.data);
  };

  const designationadd = async (e) => {
    e.preventDefault();

    const res = await addDesignations(designation, token);

    const desig = await getAlldesignations(token);

    setdesignationList(desig.data);
    setdesignation('');

    setAddStatus(false);
  };

  useEffect(() => {
    designations();
  }, []);
  return (
    <div className="designations">
      <h1>Designations</h1>

      <DepartmentDesignationTable
        name={'Designation'}
        List={designationList}
        setValue={setdesignation}
        addValue={designationadd}
        setAddStatus={setAddStatus}
        addStatus={addStatus}
        inValue={designation}
      />
    </div>
  );
}
