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
  const [error, setError] = useState('');
  const designations = async () => {
    try {
      const depart = await getAlldesignations();

      setdesignationList(depart.data);
    } catch (error) {}
  };

  const designationadd = async (e) => {
    if (designation) {
      e.preventDefault();

      const res = await addDesignations(designation);

      const desig = await getAlldesignations();

      setdesignationList(desig.data);
      setdesignation('');
      setError('');
      setAddStatus(false);
    } else {
      setError('Please Enter Designation Name....');
    }
  };

  useEffect(() => {
    if (!designationList.length) {
      designations();
    }
  }, []);
  return (
    <div className="designations">
      <h1>Designations</h1>
      {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
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
