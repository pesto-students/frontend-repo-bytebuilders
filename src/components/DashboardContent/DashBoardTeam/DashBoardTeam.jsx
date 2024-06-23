import React, { useEffect, useState } from 'react';
import { getMyTeam } from '../../../api/teamapi';

export default function DashBoardTeam() {
  const [team, setTeam] = useState({});
  const [error, setError] = useState('');
  const handleTeamMemberList = async () => {
    try {
      const res = await getMyTeam();
      const list = res.teamDetails.map((team) => team);
      setTeam(list[0]);
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.message);
      } else {
        setError(error.message);
      }
    }
  };
  useEffect(() => {
    console.log('In DashBrd team');
    if (Object.keys(team).length === 0) {
      handleTeamMemberList();
    }
  }, []);
  return (
    <>
      {error && <p style={{ color: '#FF3F3F' }}></p>}
      <div className="TeamTableDashBoard">
        {team && Object.keys(team).length !== 0 ? (
          <>
            <table style={{ border: 'none' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {team.teamMembers.map((member) => (
                  <tr key={member._id}>
                    <td>{member.fullName}</td>
                    <td>{member.designation}</td>
                    <td>{member.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <h3>No Team Available</h3>
        )}
      </div>
    </>
  );
}
