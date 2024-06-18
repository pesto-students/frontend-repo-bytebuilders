import React from 'react';
import './EmployeePermissionButton';

export default function EmployeePermissionButton({
  value,
  name,
  handleToggle,
  editflag,
}) {
  return (
    <button
      disabled={editflag}
      value={value}
      name={name}
      onClick={handleToggle}
      style={
        value
          ? {
              background: '#30d14340',
              color: '#30D143',
            }
          : {
              background: '#cdd2da',
              color: '#ffff',
            }
      }
    >
      {value ? 'Enabled' : 'Disabled'}
    </button>
  );
}
