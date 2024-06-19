import React from 'react';
import './DepartmentDesignationTable.css';
import { useSelector } from 'react-redux';
export default function DepartmentDesignationTable({
  setValue,
  List,
  name,
  addValue,
  setAddStatus,
  addStatus,
  inValue,
}) {
  const user = useSelector((state) => state.user);
  return (
    <>
      {List.length > 0 && (
        <table id="customTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Organisation</th>
            </tr>
          </thead>
          <tbody>
            {List.map((data) => (
              <tr key={data._id}>
                <td data-label="Name">{data.name}</td>
                <td data-label="Created on">
                  {data.organisationName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {user.isAdmin && (
        <div className="addbutton">
          {addStatus ? (
            <>
              <input
                type="text"
                placeholder={`${name} name`}
                name="name"
                onChange={(e) => setValue(e.target.value)}
                value={inValue}
              />
              <button onClick={addValue}>Add {name}</button>
            </>
          ) : (
            <button onClick={() => setAddStatus(true)}>
              Add {name}
            </button>
          )}
        </div>
      )}
    </>
  );
}
