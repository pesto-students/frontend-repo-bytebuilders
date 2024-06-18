import React from 'react';
import './Myteams.css';
import EmployeeCard from '../../Employee/EmployeeCard/EmployeeCard';

export default function Myteams({ team, user }) {
  return (
    <div className="teamscontainer">
      <h3>{team.teamName}</h3>
      <div className="line" />
      <h2>Manager</h2>
      {user.isReportingManager && (
        <div className="teambuttons">
          <button
            style={{ background: '#EE404C40', color: '#EE404C' }}
          >
            Delete Team
          </button>
          <button>Edit Team Name</button>
          <button>Add Member</button>
        </div>
      )}
      <EmployeeCard
        Employee={team.teamReportingManager}
        key={team.teamReportingManager._id}
      />
      <div className="line" />
      <div className="teammembers">
        <h2>Team Members</h2>
        {team.teamMembers.map(
          (member) =>
            member._id !== team.teamReportingManager._id && (
              <EmployeeCard Employee={member} key={member._id} />
            )
        )}
      </div>
    </div>
  );
}
