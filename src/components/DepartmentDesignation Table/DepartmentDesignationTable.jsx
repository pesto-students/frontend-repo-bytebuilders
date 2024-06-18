import React from 'react';
import './DepartmentDesignationTable.css';
export default function DepartmentDesignationTable({
  setValue,
  List,
  name,
  addValue,
  setAddStatus,
  addStatus,
  inValue,
}) {
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
    </>
  );
}
