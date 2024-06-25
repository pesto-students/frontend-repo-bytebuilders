import React, { useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Calculate the total number of pages
  const totalPages = Math.ceil(List.length / itemsPerPage);

  // Get the current items for the current page
  const currentItems = List.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {List.length > 0 && (
        <>
          <table id="customTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Organisation</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data) => (
                <tr key={data._id}>
                  <td data-label="Name">{data.name}</td>
                  <td data-label="Created on">{data.organisationName}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
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
